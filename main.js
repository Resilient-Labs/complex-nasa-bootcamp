// NASA API URL
const NASA_API_URL = "https://data.nasa.gov/resource/gvk9-iz74.json";

// weather URL
const weather_url = "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m&temperature_unit=fahrenheit";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const facilityList = document.getElementById("facility-list");

// event listener for search button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value; 
    if (city) {
        fetchFacilitiesByCity(city); 
    } else {
        alert("Please enter a city name."); 
    }
});

// fetch facilities for each city
function fetchFacilitiesByCity(city) {
    fetch(`${NASA_API_URL}?city=${city}`)
        .then(response => response.json())
        .then(facilities => {
            // clears previous results
            facilityList.innerHTML = ""; 

            if (facilities.length > 0) {
                facilities.forEach(facility => {
                   
                    addFacilityToDOM(facility); 
                });
            } else {
                facilityList.innerText = `No facilities found for ${city}`; 
            }
        })
        .catch(error => {
            console.error("Error fetching NASA facilities:", error);
            facilityList.innerText = `Error fetching facilities for ${city}`; 
        });
}

// add facility to DOM
function addFacilityToDOM(facility) {
    const facilityDiv = document.createElement("div");
    facilityDiv.classList.add("facility");

    const facilityName = facility.facility; 
    const facilityLocation = `${facility.city}, ${facility.state}`; 
    const latitude = facility.location.latitude; 
    const longitude = facility.location.longitude; 

    // sets initial text while fetching weather
    facilityDiv.innerText = `${facilityName} - Location: ${facilityLocation} - Weather: Loading...`;
    facilityList.appendChild(facilityDiv); 

    // fetches weather data for the facility's location
    fetchWeather(latitude, longitude)
        .then(weatherData => {
            facilityDiv.innerText = `
                ${facilityName}
                Location: ${facilityLocation}
                Weather: ${weatherData ? `${weatherData.temp}°F` : 'No data available'}
            `;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            facilityDiv.innerText = `${facilityName} - Location: ${facilityLocation} - Weather: No data`;
        });
}

// fetches weather data based on latitude and longitude
function fetchWeather(latitude, longitude) {
    const weatherUrl = `${weather_url}&latitude=${latitude}&longitude=${longitude}`;

    return fetch(weatherUrl)
        .then(response => response.json())
        .then(weather => {
            if (weather && weather.hourly && weather.hourly.temperature_2m) {
                return {
                    temp: weather.hourly.temperature_2m[0] 
                };
            }
            // returns null if no weather data is available for city
            return "N/A"; 
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            return "N/A"; 
        });
}
