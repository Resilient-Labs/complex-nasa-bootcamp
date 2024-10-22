function getNASAFacilities() {
    fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
        .then(response => response.json())
        .then(data => {
            let output = "";
            data.forEach(center => {
                const { facility, city, state } = center;
                // For each facility, fetch the weather data based on the city
                getWeather(city).then(weather => {
                    output += `
                        <div class="facility">
                            <h2>${facility}</h2>
                            <h3>${city}, ${state}</h3>
                            <p><strong>Weather:</strong> ${weather.temp_f}°F, ${weather.condition.text}</p>
                        </div>
                    `;
                    document.getElementById("output").innerHTML = output;
                }).catch(error => {
                    console.error(`Error fetching weather for ${city}:`, error);
                });
            });
        })
        .catch(err => console.error("Error fetching NASA facilities:", err));
}

// Fetch Weather Data
function getWeather(location) {
    const weatherAPIKey = "19cfaa6b7c77450a8c5173953241710";
    const weatherAPIUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${location}&aqi=no`;

    return fetch(weatherAPIUrl)
        .then(response => response.json())
        .then(data => data.current) // Return the current weather data
        .catch(error => {
            console.error(`Error fetching weather data:`, error);
            // Return fallback weather data in case of error
            return { temp_f: "N/A", condition: { text: "N/A", icon: "" } };
        });
}

// Load NASA facilities with weather data on page load
getNASAFacilities();