const statusMsg = document.querySelector("#statusMsg");
const list = document.querySelector("#facilityList");

// keep proxy link
const nasaURL = "https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json";

fetch(nasaURL)
    .then(res => res.json())
    .then(data => {
        const facilities = data;

        if (!facilities || !facilities.length) {
            statusMsg.textContent = "No facilities found.";
            return;
        }

        statusMsg.textContent = "NASA facilities loaded. Click 'Show weather' to view conditions.";

        facilities.forEach(facility => {
            const name = facility.facility || "Unknown Facility";
            const center = facility.center || "Unknown Center";
            const city = facility.city || "";
            const state = facility.state || "";
            const lat = facility.location && facility.location.latitude;
            const lon = facility.location && facility.location.longitude;

            // create card
            const li = document.createElement("li");

            const title = document.createElement("div");
            title.textContent = `${center} — ${name} (${city}, ${state})`;
            li.appendChild(title);

            // weather button
            const btn = document.createElement("button");
            btn.textContent = "Show weather";

            // weather box
            const weather = document.createElement("div");
            weather.className = "weather";
            weather.style.display = "none"; // start hidden

            // show weather when clicked
            btn.addEventListener("click", () => {
                weather.style.display = "block"; // make it visible

                if (!lat || !lon) {
                    weather.textContent = "No coordinates available.";
                    return;
                }

                weather.textContent = "Loading weather...";

                const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

                fetch(weatherUrl)
                    .then(res => res.json())
                    .then(data => {
                        const current = data.current_weather;
                        if (current) {
                            weather.textContent = `Temp: ${current.temperature}°C | Wind: ${current.windspeed} m/s`;
                        } else {
                            weather.textContent = "No weather data found.";
                        }
                    })
                    .catch(err => {
                        console.log("Error:", err);
                        weather.textContent = "Error fetching weather.";
                    });
            });

            li.appendChild(btn);
            li.appendChild(weather);
            list.appendChild(li);
        });
    })
    .catch(err => {
        console.log("Error:", err);
        statusMsg.textContent = "Error loading NASA data. Please reload.";
    });
