// Class to fetch NASA facility data
class NASAData {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.nasaURL = `https://data.nasa.gov/resource/gvk9-iz74.json?$$app_token=${this.apiKey}`;
    }

    // Fetches NASA facilities data and calls the callback function with the data
    getFacilities(callback) {
        fetch(this.nasaURL)
            .then(response => response.json()) // Convert response to JSON
            .then(data => {
                console.log("NASA Data:", data); // Debugging
                callback(data);
            })
            .catch(error => console.error("Error fetching NASA facilities:", error));
    }
}

// Class to fetch weather data from OpenWeatherMap
class Weather {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.weatherURL = "https://api.openweathermap.org/data/2.5/weather";
    }

    // Fetches weather data for given latitude and longitude
    getWeather(lat, lon, facilityName) {
        fetch(`${this.weatherURL}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`)
            .then(response => response.json()) // Convert response to JSON
            .then(data => {
                console.log(`Weather for ${facilityName}:`, data); // Debugging
                UI.updateWeather(facilityName, data);
            })
            .catch(error => console.error(`Error fetching weather for ${facilityName}:`, error));
    }
}

// Class to manage UI updates
class UI {
    // Displays the list of facilities on the webpage
    static displayFacilities(facilities) {
        const container = document.getElementById("facilities-container");
        container.innerHTML = ""; // Clear previous content

        facilities.forEach(facility => {
            const facilityName = facility.facility || "Unknown Facility";
            const city = facility.city || "Unknown City";
            const state = facility.state || "Unknown State";
            const lat = facility.location?.latitude;
            const lon = facility.location?.longitude;

            // Create a card for each facility
            const facilityCard = document.createElement("div");
            facilityCard.classList.add("facility");
            facilityCard.innerHTML = `
                <h2>${facilityName}</h2>
                <p>${city}, ${state}</p>
                <p id="weather-${facilityName.replace(/\s+/g, '')}">Fetching weather...</p>
            `;

            container.appendChild(facilityCard);

            // Fetch weather if lat/lon exists
            if (lat && lon) {
                weather.getWeather(lat, lon, facilityName);
            } else {
                document.getElementById(`weather-${facilityName.replace(/\s+/g, '')}`).textContent = "Weather data unavailable";
            }
        });
    }

    // Updates weather data in the UI
    static updateWeather(facilityName, weatherData) {
        const weatherElement = document.getElementById(`weather-${facilityName.replace(/\s+/g, '')}`);
        if (weatherElement && weatherData.main) {
            weatherElement.textContent = `Temp: ${weatherData.main.temp}°C, ${weatherData.weather[0].description}`;
        }
    }

    // Toggles dark mode on and off
    static toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
    }
}

// Initialize NASA and Weather instances with API keys
const nasa = new NASAData("pittyJyfgndNDefa98bB1304lYrmmH2sRm5Oierq");
const weather = new Weather("a892507f23bd0efd3ecf30b2c30cd588");

// Function to fetch and display NASA facilities with weather
function fetchNASAData() {
    nasa.getFacilities(facilities => {
        UI.displayFacilities(facilities);
    });
}

// Attach event listeners to buttons
document.getElementById("fetch-nasa-data").addEventListener("click", fetchNASAData);
document.getElementById("toggle-dark-mode").addEventListener("click", UI.toggleDarkMode);
