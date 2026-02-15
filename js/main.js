// Define const
// NASA Facilities JSON (via CORS proxy) Maureen, Leeanne, Godwin
// No API-key needed for nasa station url
const nasaStationsUrl = 'https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json'

// OpenWeather API key
const weatherApiKey = 'd23e009d9e3c420522a7d9b1300082d7';

// Initialize Leaflet map reference: leafletjs.com
const map = L.map('map').setView([37.0, -95.0], 4);

// Add OpenStreetMap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Fetch NASA stations first
fetch(nasaStationsUrl)
    .then(response => response.json())
    .then(data => {
        const stations = data; //Parse json from nasa
        console.log(stations);

        // Group stations by center //chatgpt, mdn, stackoverflow
        const centersMap = {};
        stations.forEach(station => {
            if (!centersMap[station.center]) {
                centersMap[station.center] = [];
            }
            centersMap[station.center].push(station);
        });

        // Get facilitiesInfo container
        const facilitiesInfo = document.querySelector('#facilitiesInfo');
        facilitiesInfo.innerHTML = ''; // clear previous content

        // Create main details for all facilities
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = `Facilities (${stations.length})`;
        details.appendChild(summary);

        const ul = document.createElement('ul');

        // Create object to store markers by center name //chatgpt
        const centerMarkers = {};

        // Loop through each center to get all facilities inside of the dom
        Object.keys(centersMap).forEach(centerName => { //chatgpt and stackoverflow
            const centerDetails = document.createElement('details');

            // Summary for center
            const centerSummary = document.createElement('summary');
            centerSummary.textContent = centerName + ` (${centersMap[centerName].length})`;
            centerDetails.appendChild(centerSummary);

            // List of facilities under this center
            const facilityUl = document.createElement('ul');
            centersMap[centerName].forEach(facilityObj => {
                const li = document.createElement('li');
                li.textContent = facilityObj.facility;
                facilityUl.appendChild(li);
            });

            centerDetails.appendChild(facilityUl);
            ul.appendChild(centerDetails);

            // Weather + Map Marker for the center (once per center) 
            const firstStation = centersMap[centerName][0];//chatgpt
            if (firstStation && firstStation.location && firstStation.location.latitude && firstStation.location.longitude) { //chatgpt and stackoverflow
                const lat = firstStation.location.latitude;
                const lng = firstStation.location.longitude;

                // Add map marker for the center //leafletjs.com
                const marker = L.marker([lat, lng]).addTo(map);

                // Store marker reference
                centerMarkers[centerName] = marker;

                // Fetch weather for this center
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${weatherApiKey}`;

                fetch(weatherUrl)
                    .then(res => res.json())
                    .then(weather => {
                        const popupContent = `
                            <strong>${centerName}</strong><br>
                            City: ${firstStation.city}, ${firstStation.state}, ${firstStation.country}<br>
                            Weather: ${weather.weather[0].description}, ${weather.main.temp}°F
                        `;
                        marker.bindPopup(popupContent);
                        console.log(`Weather for ${centerName}:`, popupContent);
                    })
                    .catch(err => {
                        console.error(`Weather fetch error for ${centerName}:`, err);
                        marker.bindPopup(`<strong>${centerName}</strong>
                            <br>
                            Weather data unavailable.`);
                    });

                // Zoom to marker when clicking the center name //chatgpt, brocode, mapbox, leafletjs.com
                let lastCenter = null; // track last clicked center

                centerSummary.addEventListener('click', () => {
                    if (lastCenter === centerName) {
                        // Toggle back out to default view
                        map.setView([37.0, -95.0], 4);
                        lastCenter = null;
                    } else {
                        // Zoom in on selected center
                        map.setView([lat, lng], 8);
                        marker.openPopup();
                        lastCenter = centerName;
                    }
                });
            }
        });

        details.appendChild(ul);
        facilitiesInfo.appendChild(details);
    })
    .catch(err => console.error('NASA fetch error:', err));
