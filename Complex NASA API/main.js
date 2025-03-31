document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to the button
    document.getElementById('fetchData').addEventListener('click', findNasaLocations);
});

function findNasaLocations() {
    let resultsContainer = document.getElementById("results");

    // Clear previous results before fetching new data
    resultsContainer.innerHTML = "<li>Loading data...</li>";

    // Fetch NASA location data
    fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
        .then(res => {
            if (!res.ok) throw new Error(`NASA API error: ${res.status}`);
            return res.json();
        })
        .then(nasaData => {
            // Validate API response
            if (!Array.isArray(nasaData) || nasaData.length === 0) {
                console.error("Invalid or empty data from NASA API.");
                resultsContainer.innerHTML = "<li>Error: No data returned from NASA.</li>";
                return;
            }

            console.log("Successfully fetched NASA location data:", nasaData);
            resultsContainer.innerHTML = ""; // Clear loading message

            // Loop through NASA locations and fetch weather for each
            nasaData.forEach(item => {
                if (item.location && item.location.latitude && item.location.longitude) {
                    let latitude = item.location.latitude;
                    let longitude = item.location.longitude;
                    let city = item.city || "Unknown City";
                    let state = item.state || "Unknown State";
                    let country = item.country || "US"; // Default to US
                    let zipcode = item.zipcode || "Unknown Zipcode";

                    // Create list item and display location info
                    let listItem = document.createElement("li");
                    listItem.textContent = `${city}, ${state}, ${country}, ${zipcode}: Fetching temperature...`;
                    resultsContainer.appendChild(listItem);

                    // Fetch weather data using latitude & longitude
                    let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;

                    fetch(weatherUrl)
                        .then(res => {
                            if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
                            return res.json();
                        })
                        .then(weatherData => {
                            console.log(`Weather Data for ${city}, ${state}:`, weatherData);

                            if (weatherData.current && weatherData.current.temperature_2m !== undefined) {
                                let temperatureC = weatherData.current.temperature_2m;
                                let temperatureF = (temperatureC * 9/5) + 32; // Convert °C to °F

                                // Update the list item with temperature
                                listItem.textContent = `${city}, ${state}, ${country}, ${zipcode}: ${temperatureF.toFixed(1)}°F`;
                            } else {
                                listItem.textContent = `${city}, ${state}, ${country}, ${zipcode}: Weather data not available`;
                            }
                        })
                        .catch(err => {
                            console.error(`Error fetching weather for ${city}, ${state}:`, err);
                            listItem.textContent = `${city}, ${state}, ${country}, ${zipcode}: Failed to fetch weather`;
                        });
                }
            });
        })
        .catch(err => {
            console.error("Error fetching NASA data:", err);
            resultsContainer.innerHTML = "<li>Error: Failed to fetch NASA data.</li>";
        });
}

