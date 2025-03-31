document.getElementById('loadDataBtn').addEventListener('click', displayFacilitiesWithWeather);

// Fetch NASA facility locations
function getFacilities(offset = 0, limit = 100) {
    // getting a batch of facilities starting at 'offset' with a 'limit' of items
    console.log(`fetch from offset ${offset} limit ${limit}...`);
    return fetch(`https://data.nasa.gov/resource/gvk9-iz74.json?$limit=${limit}&$offset=${offset}`)
        .then(response => response.json())  // Converting the response into JSON data
        .then(facilities => {
            console.log(`Fetched ${facilities.length} facilities.`); // Just checking how many facilities we got
            return facilities;
        })
        .catch(error => {
            // If something goes wrong, will print an error message
            console.error('Error fetching NASA facilities:', error);
        });
}

// Fetch weather info for a location
function getWeather(lat, lon) {
    let apiKey = 'bd4ccf38d90c0d6899419a4b351c403d'; // my API key
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    console.log(`Fetching weather for lat: ${lat}, lon: ${lon}`);
    return fetch(url)
        .then(response => response.json())  // Parsing the weather data
        .then(weatherData => {
            console.log('Weather data received:', weatherData); // Just checking the weather data
            return weatherData;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Combine both data sources and display on webpage
function displayFacilitiesWithWeather() {
    let facilityList = document.getElementById('facility-list'); // This is where the list will go

    // loading 100 facilities at a time so wont overload 
    const limit = 100;
    const totalFacilities = 400; // fetching all 400 facilities

    // loop will go through each batch of facilities, starting from 0 and adding 100 each time
    for (let offset = 0; offset < totalFacilities; offset += limit) {
        getFacilities(offset, limit).then(facilities => {  // Get a batch of facilities
            if (!facilities) {
                console.error('No facilities data received.'); // If no facilities come through, print this
                return;
            }

            // Loop through all the facilities we got
            facilities.forEach(facility => {
                let name = facility.facility; // Name of the facility
                let location = `${facility.city}, ${facility.state}`; //city/state of the facility
                let lat = facility.location?.latitude; // Latitude of the facility
                let lon = facility.location?.longitude; // Longitude of the facility

                let listItem = document.createElement('li'); 
                listItem.textContent = `Facility: ${name} | Location: ${location}`; // adding the facility name and location to the list item

                if (lat && lon) { // If latitude and longitude exist, fetch the weather
                    getWeather(lat, lon).then(weather => {
                        let weatherDescription = weather?.weather?.[0]?.description || 'No weather data'; // If weather exists, show it

                        // Add weather info to the list item
                        listItem.textContent += ` | Weather: ${weatherDescription}`;
                    });
                } else {
                    listItem.textContent += ' | Weather: no coordinates '; // If no coordinates, show this
                    console.warn(`Skipping ${name}, missing coordinates.`); // Warn that coordinates are missing
                }

                facilityList.appendChild(listItem); // Add the list item to the webpage
            });
        });
    }
}

