//  1. Go to NASA api
//  2. return all of their facility location
//  3. Display: 
//     - name of facility
//     - location
//     - current weather at facility

const NASA_API_KEY = "lj6rna2IOJNh3LtKCsO4I7xeCb9FdvLXipVkG9Py";
const WEATHER_API_KEY = "c779f40c3eae111b8c72654a6d4a5751";
const NASA_API_URL = `https://data.nasa.gov/resource/gvk9-iz74.json?$$app_token=${NASA_API_KEY}`;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Fetch NASA facility data
async function fetchFacilities() {
    try {
        const response = await fetch(NASA_API_URL);
        const facilities = await response.json();
        return facilities;
    } catch (error) {
        console.error("Error fetching NASA facilities:", error);
        return [];
    }
}

// Fetch weather data for a specific location
async function fetchWeather(lat, lon) {
    try {
        const response = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

// Display the NASA facilities and their current weather
async function displayFacilities() {
    const facilitiesList = document.getElementById('facilities-list');
    const facilities = await fetchFacilities();

    if (facilities.length === 0) {
        facilitiesList.innerHTML = "<p>No facilities found.</p>";
        return;
    }

    facilities.forEach(async (facility) => {
        const { facility: name, city, location } = facility;
        const lat = location.latitude;
        const lon = location.longitude;
        
        // Get weather for the facility location
        const weather = await fetchWeather(lat, lon);
        const weatherDescription = weather 
            ? `${weather.main.temp}°F, ${weather.weather[0].description}` 
            : "Weather data unavailable";

        // Create the facility HTML element
        const facilityDiv = document.createElement('div');
        facilityDiv.classList.add('facility');
        facilityDiv.innerHTML = `
            <h3>${name}</h3>
            <p>Location: ${city}</p>
            <p class="weather">Current Weather: ${weatherDescription}</p>
        `;
        
        // Append the facility to the list
        facilitiesList.appendChild(facilityDiv);
    });
}

// Initial display call
displayFacilities();











