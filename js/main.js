const apiKeyOne = '1c58d08b11fddda92b59c605ac5d3366';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';

const nasaURL = 'https://data.nasa.gov/resource/gvk9-iz74.json';

const getFacilitiesBtn = document.getElementById('getFacilitiesBtn');
const facilitiesContainer = document.getElementById('facilitiesContainer');

// fetch nasa facilities 
const fetchFacilities = () => {
    console.log("Fetching NASA Facilities...");  // check if function called

    fetch(nasaURL)
        .then(response => response.json())
        .then(data => {
            console.log("NASA Data:", data);  // log fetchednasa data to console

            // loop through each facility, check for latitude/longitude
            if (Array.isArray(data)) {
                data.forEach(facility => {
                    const { center, location, facility: facilityName, city, state } = facility;
                    const latitude = location?.latitude;
                    const longitude = location?.longitude;

                    // log the facility data to inspect it
                    console.log(`Checking facility: ${center}`);
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                    // check if latitude and longitude exist 
                    if (!latitude || !longitude) {
                        console.log(`Skipping facility ${center} due to missing coordinates.`);
                        return;
                    }

                    // If latitude+longitude are present, fetch weather data
                    fetchWeather(latitude, longitude, facilityName, city, state);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching NASA facilities:', error);
        });
};

// fetch weather openweather api
const fetchWeather = (lat, lon, facilityName, city, state) => {
    console.log(`Fetching weather for ${facilityName}...`);  // check if weather fetch called

    const weatherUrl = `${weatherURL}?lat=${lat}&lon=${lon}&appid=${apiKeyOne}&units=Imperial`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(weatherData => {
            console.log("Weather Data:", weatherData);

            if (weatherData && weatherData.weather) {
                const weatherInfo = weatherData.weather[0];
                const temperature = weatherData.main.temp;
                const weatherDescription = weatherInfo.description;

                // display facility and weather data
                displayFacility(facilityName, city, state, lat, lon, temperature, weatherDescription);
            }
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
        });
};

// display facility and weather information in html
const displayFacility = (name, city, state, lat, lon, temp, description) => {
    const facilityCard = document.createElement('div');
    facilityCard.classList.add('facility-card');

    facilityCard.innerHTML = `
        <h2>${name}</h2>
        <p>Location: ${city}, ${state || 'Not available'}</p>
        <div class="weather">
            <p>Temperature: ${temp}°F</p>
            <p>Weather: ${description}</p>
            
        </div>
    `;

    facilitiesContainer.appendChild(facilityCard);
};

// event listener for button click
getFacilitiesBtn.addEventListener('click', () => {
    console.log("Button clicked! Fetching facilities..."); 
    facilitiesContainer.innerHTML = '';  
    fetchFacilities(); 
});
