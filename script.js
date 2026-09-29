// server.js passes NASA's facilities API through here, NASA itself blocks browser requests (CORS)
const FACILITIES_URL = "/api/facilities";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
// how many weather requests go out at once
const BATCH_SIZE = 5;

const searchInput = document.getElementById("search-input");
const messageEl = document.getElementById("message");
const facilitiesEl = document.getElementById("facilities");

// open-meteo weather_code -> words (WMO codes)
const WEATHER_CODES = {
  0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Fog", 48: "Freezing fog",
  51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle", 56: "Freezing drizzle", 57: "Freezing drizzle",
  61: "Light rain", 63: "Rain", 65: "Heavy rain", 66: "Freezing rain", 67: "Freezing rain",
  71: "Light snow", 73: "Snow", 75: "Heavy snow", 77: "Snow grains",
  80: "Rain showers", 81: "Rain showers", 82: "Heavy rain showers", 85: "Snow showers", 86: "Snow showers",
  95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Thunderstorm with hail",
};

let cards = [];
let summary = "";

// ---------- start ----------
async function start() {
  console.log("[App] Starting NASA facility lookup");

  const facilities = await fetchFacilities();
  if (!facilities) return;

  console.log("[App] Rendering facilities");
  renderFacilities(facilities);
  searchInput.disabled = false;
  showMessage(`Showing ${facilities.length} facilities. Loading current weather...`, false);

  // lots of facilities share the exact same coordinates (one spot per center),
  // so one request per spot instead of one per facility
  const groups = groupByCoordinates(facilities);
  const noCoords = facilities.filter(function (f) { return !f.hasCoords; }).length;
  console.log(`[App] ${facilities.length} facilities share ${groups.length} unique coordinate(s). ${noCoords} have no valid coordinates.`);

  const failed = await loadAllWeather(groups);

  summary = `Showing ${facilities.length} facilities. Weather loaded for ${groups.length - failed} of ${groups.length} locations.`;
  if (failed > 0) summary += ` ${failed} location(s) unavailable.`;
  if (noCoords > 0) summary += ` ${noCoords} facility(s) have no coordinates.`;
  console.log("[App]", summary);
  updateCount();
}

// ---------- API 1: NASA facilities ----------
async function fetchFacilities() {
  console.log("[NASA] Requesting facility data:", FACILITIES_URL);

  let data;
  try {
    const response = await fetch(FACILITIES_URL);
    console.log(`[NASA] Response status: ${response.status}`);

    if (!response.ok) {
      // 404 means the page isn't being served by server.js (e.g. opened with Live Server)
      if (response.status === 404) {
        throw new Error("The facilities route wasn't found. Start the app with \"node server.js\" and open http://localhost:3000");
      }
      // server.js sends { error } when NASA itself fails
      const body = await response.json().catch(function (parseError) {
        console.error("[NASA] Error response wasn't JSON:", parseError);
        return null;
      });
      throw new Error(body && body.error ? body.error : `Facility request failed with status ${response.status}`);
    }

    data = await response.json();
  } catch (error) {
    console.error("[NASA] Facility request failed:", error);
    // TypeError = no response at all, usually the page was opened as a file or server.js isn't running
    const text = error instanceof TypeError
      ? "Couldn't reach the facilities server. Start it with \"node server.js\" and open http://localhost:3000"
      : `Couldn't load NASA facilities: ${error.message}`;
    showMessage(text, true);
    return null;
  }

  if (!Array.isArray(data) || data.length === 0) {
    console.error("[NASA] Unexpected response, expected a list of facilities:", data);
    showMessage("NASA sent back facility data in an unexpected format.", true);
    return null;
  }

  console.log(`[NASA] Received facilities: ${data.length}`);
  return data.map(cleanFacility);
}

// pulls out just what the page needs and checks the coordinates are real numbers
function cleanFacility(raw) {
  const location = raw && raw.location ? raw.location : {};
  const latitude = parseFloat(location.latitude);
  const longitude = parseFloat(location.longitude);
  const hasCoords = !isNaN(latitude) && !isNaN(longitude) &&
    Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;

  if (!hasCoords) {
    console.warn("[NASA] Facility has no valid coordinates, skipping its weather:", raw && raw.facility);
  }

  return {
    // some names have trailing spaces in NASA's data
    name: raw && raw.facility ? raw.facility.trim() : "Unnamed facility",
    center: raw && raw.center ? raw.center : "",
    city: raw && raw.city ? raw.city : "",
    state: raw && raw.state ? raw.state : "",
    zip: raw && raw.zipcode ? raw.zipcode : "",
    country: raw && raw.country ? raw.country : "",
    latitude: latitude,
    longitude: longitude,
    hasCoords: hasCoords,
  };
}

// ---------- rendering facilities ----------
function renderFacilities(facilities) {
  facilitiesEl.innerHTML = "";
  cards = [];

  facilities.forEach(function (facility) {
    const card = document.createElement("article");
    card.className = "card";

    const name = document.createElement("h2");
    name.textContent = facility.name;
    card.appendChild(name);

    if (facility.center) addLine(card, facility.center);

    const place = [facility.city, facility.state].filter(Boolean).join(", ");
    addLine(card, [place, facility.zip, facility.country].filter(Boolean).join(" ") || "Location not listed");

    if (facility.hasCoords) {
      const coords = addLine(card, `${facility.latitude}, ${facility.longitude}`);
      coords.className = "coords";
      // used by the weather step (and handy for checking the weather matches in dev tools)
      card.dataset.coords = `${facility.latitude},${facility.longitude}`;
    }

    const weatherEl = document.createElement("div");
    weatherEl.className = "weather";
    card.appendChild(weatherEl);

    if (facility.hasCoords) {
      weatherEl.innerHTML = '<p class="muted">Loading weather...</p>';
    } else {
      renderWeatherUnavailable(weatherEl);
    }

    // everything the search box should match on
    card.dataset.search = [facility.name, facility.center, facility.city, facility.state, facility.zip].join(" ").toLowerCase();

    facility.weatherEl = weatherEl;
    facilitiesEl.appendChild(card);
    cards.push(card);
  });
}

function groupByCoordinates(facilities) {
  const groups = {};
  facilities.forEach(function (facility) {
    if (!facility.hasCoords) return;
    const key = `${facility.latitude},${facility.longitude}`;
    if (!groups[key]) {
      groups[key] = { latitude: facility.latitude, longitude: facility.longitude, facilities: [] };
    }
    groups[key].facilities.push(facility);
  });
  return Object.values(groups);
}

// ---------- API 2: Open-Meteo ----------
// goes through the groups BATCH_SIZE at a time so we're not firing everything at once
async function loadAllWeather(groups) {
  let failed = 0;

  for (let i = 0; i < groups.length; i += BATCH_SIZE) {
    const batch = groups.slice(i, i + BATCH_SIZE);
    console.log(`[Open-Meteo] Batch ${i / BATCH_SIZE + 1}: ${batch.length} location(s)`);

    const results = await Promise.all(batch.map(loadWeatherForGroup));
    failed += results.filter(function (ok) { return !ok; }).length;
  }

  return failed;
}

// returns true/false so loadAllWeather can count failures. one bad spot never stops the others
async function loadWeatherForGroup(group) {
  const label = `${group.facilities[0].center || group.facilities[0].name} (${group.latitude}, ${group.longitude}, ${group.facilities.length} facilities)`;

  try {
    const current = await fetchWeather(group.latitude, group.longitude, label);
    group.facilities.forEach(function (facility) {
      renderWeather(facility.weatherEl, current);
    });
    return true;
  } catch (error) {
    console.error(`[Open-Meteo] Weather request failed for: ${label}`, error);
    group.facilities.forEach(function (facility) {
      renderWeatherUnavailable(facility.weatherEl);
    });
    return false;
  }
}

async function fetchWeather(latitude, longitude, label) {
  const url = `${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}` +
    "&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code" +
    "&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto";
  console.log(`[Open-Meteo] Requesting weather for: ${label}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Open-Meteo responded with status ${response.status}`);
  }

  const data = await response.json();
  // temperature is the one thing the assignment needs, so no temp = treat it as failed
  if (!data || !data.current || typeof data.current.temperature_2m !== "number") {
    console.error("[Open-Meteo] Unexpected weather response:", data);
    throw new Error("Weather response was missing the current temperature");
  }

  console.log(`[Open-Meteo] Weather received for: ${label} -> ${data.current.temperature_2m}°F`);
  return data.current;
}

// ---------- rendering weather ----------
function renderWeather(weatherEl, current) {
  weatherEl.innerHTML = "";

  const temp = addLine(weatherEl, `${Math.round(current.temperature_2m)}°F`);
  temp.className = "temp";

  const conditions = WEATHER_CODES[current.weather_code];
  if (conditions) addLine(weatherEl, conditions);

  // the extras are nice to have, skip any that didn't come back
  const extras = [];
  if (typeof current.apparent_temperature === "number") extras.push(`Feels like ${Math.round(current.apparent_temperature)}°F`);
  if (typeof current.relative_humidity_2m === "number") extras.push(`${current.relative_humidity_2m}% humidity`);
  if (typeof current.wind_speed_10m === "number") extras.push(`Wind ${Math.round(current.wind_speed_10m)} mph`);
  if (extras.length > 0) addLine(weatherEl, extras.join(" · "));
}

function renderWeatherUnavailable(weatherEl) {
  weatherEl.innerHTML = '<p class="muted">Weather unavailable</p>';
}

// ---------- search ----------
searchInput.addEventListener("input", updateCount);

function updateCount() {
  const term = searchInput.value.trim().toLowerCase();
  let shown = 0;

  cards.forEach(function (card) {
    const match = card.dataset.search.includes(term);
    card.hidden = !match;
    if (match) shown++;
  });

  if (term === "") {
    showMessage(summary || `Showing ${cards.length} facilities. Loading current weather...`, false);
  } else {
    showMessage(`${shown} of ${cards.length} facilities match "${searchInput.value.trim()}".`, false);
  }
}

// ---------- helpers ----------
function addLine(parent, text) {
  const p = document.createElement("p");
  // textContent since all of this comes from the APIs
  p.textContent = text;
  parent.appendChild(p);
  return p;
}

function showMessage(text, isError) {
  messageEl.textContent = text;
  messageEl.className = isError ? "error" : "";
}

start();
