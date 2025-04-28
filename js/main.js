document.addEventListener('DOMContentLoaded', async function() {
    // Map initialization
    const map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // NASA icon
    const nasaIcon = L.icon({
        iconUrl: 'https://img.icons8.com/color/48/nasa.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    // DOM elements
    const searchInput = document.getElementById('search');
    const showAllBtn = document.getElementById('show-all');
    const resultsContainer = document.getElementById('results');
    const loadingElement = document.getElementById('loading');
    
    let allFacilities = [];
    let markers = [];
    let currentDisplayMode = 'all';

    // Main initialization
    async function init() {
        try {
            loadingElement.textContent = "Loading NASA facilities...";
            const response = await fetch('https://data.nasa.gov/resource/gvk9-iz74.json');
            let facilities = await response.json();
            facilities = removeDuplicates(facilities);
            allFacilities = await processFacilityLocations(facilities);
            createAllMarkers(true);
            setupSearch();
            loadingElement.textContent = `Loaded ${allFacilities.length} facilities`;
            setTimeout(() => loadingElement.style.display = "none", 2000);
        } catch (error) {
            console.error("Error:", error);
            loadingElement.textContent = "Error loading data. See console.";
        }
    }

    function removeDuplicates(facilities) {
        const uniqueMap = new Map();
        facilities.forEach(facility => {
            const key = `${facility.center || facility.facility}-${facility.location?.latitude}-${facility.location?.longitude}`;
            if (!uniqueMap.has(key)) uniqueMap.set(key, facility);
        });
        return Array.from(uniqueMap.values());
    }

    async function processFacilityLocations(facilities) {
        return await Promise.all(facilities.map(async facility => {
            let lat, lon, locationType;
            
            if (facility.location?.latitude && facility.location?.longitude) {
                lat = parseFloat(facility.location.latitude);
                lon = parseFloat(facility.location.longitude);
                locationType = 'exact';
            } else {
                const coords = await geocodeLocation(facility.city, facility.state, facility.country);
                lat = coords?.lat || 0;
                lon = coords?.lon || 0;
                locationType = coords ? 'approximate' : 'unknown';
            }
            
            return {
                ...facility,
                displayName: `${facility.center || facility.facility} - ${facility.city}, ${facility.state}`,
                searchText: `${facility.center} ${facility.facility} ${facility.city} ${facility.state} ${facility.country}`.toLowerCase(),
                lat,
                lon,
                locationType
            };
        }));
    }

    async function geocodeLocation(city, state, country) {
        if (!city) return null;
        try {
            const query = [city, state, country].filter(Boolean).join(', ');
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
            const results = await response.json();
            return results[0] ? { lat: parseFloat(results[0].lat), lon: parseFloat(results[0].lon) } : null;
        } catch (e) {
            console.warn("Geocoding failed for", city, state);
            return null;
        }
    }

    function createAllMarkers(visible) {
        clearAllMarkers();
        markers = allFacilities.map(facility => {
            const marker = L.marker([facility.lat, facility.lon], {
                icon: nasaIcon,
                opacity: visible ? 1 : 0,
                riseOnHover: true
            }).addTo(map);
            bindPopupContent(marker, facility);
            return marker;
        });
        if (visible && allFacilities.length > 0) zoomToAllVisible();
    }

    function clearAllMarkers() {
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];
    }

    function bindPopupContent(marker, facility) {
        const baseContent = `
            <div class="facility-info">
                <h3>${facility.center || facility.facility || 'Unknown Facility'}</h3>
                <p>${[facility.city, facility.state, facility.country].filter(Boolean).join(', ')}</p>
                ${facility.locationType === 'approximate' ? '<p><em>Approximate location</em></p>' : ''}
                ${facility.locationType === 'unknown' ? '<p><em>Location unknown</em></p>' : ''}
                <div class="weather-container">
                    <div class="weather-loading">Loading weather data...</div>
                </div>
            </div>
        `;

        marker.bindPopup(baseContent);
        
        marker.on('popupopen', async function() {
            if (facility.locationType !== 'unknown') {
                try {
                    const weather = await fetchWeather(facility.lat, facility.lon);
                    if (weather) {
                        const weatherContent = `
                            <div class="weather-display">
                                <img src="https:${weather.current.condition.icon}" width="20" alt="Weather icon">
                                ${weather.current.temp_f}°F - ${weather.current.condition.text}
                            </div>
                        `;
                        this.setPopupContent(baseContent.replace(
                            '<div class="weather-loading">Loading weather data...</div>',
                            weatherContent
                        ));
                    }
                } catch (error) {
                    this.setPopupContent(baseContent.replace(
                        '<div class="weather-loading">Loading weather data...</div>',
                        '<div class="weather-error">Weather data unavailable</div>'
                    ));
                }
            }
        });

        marker.on('popupclose', function() {
            this.setPopupContent(baseContent);
        });
    }

    function setupSearch() {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            if (searchTerm.length < 2) {
                resultsContainer.innerHTML = '';
                return;
            }
            const results = allFacilities.filter(facility => facility.searchText.includes(searchTerm));
            displaySearchResults(results);
        });
        
        showAllBtn.addEventListener('click', () => {
            currentDisplayMode = 'all';
            createAllMarkers(true);
            searchInput.value = '';
            resultsContainer.innerHTML = '';
        });
    }

    function displaySearchResults(results) {
        resultsContainer.innerHTML = '';
        currentDisplayMode = 'search';
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="result-item">No facilities found</div>';
            hideAllMarkers();
            return;
        }
        
        updateMarkerVisibility(results);
        
        results.slice(0, 50).forEach(facility => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.textContent = facility.displayName;
            resultItem.addEventListener('click', (e) => {
                e.stopPropagation();
                selectFacility(facility);
            });
            resultsContainer.appendChild(resultItem);
        });
        
        zoomToVisibleMarkers();
    }

    function selectFacility(facility) {
        resultsContainer.innerHTML = '';
        searchInput.value = '';
        const marker = markers[allFacilities.indexOf(facility)];
        
        // Calculate the exact position needed to center the marker
        const markerLatLng = L.latLng(facility.lat, facility.lon);
        const markerPixel = map.latLngToContainerPoint(markerLatLng);
        const centerPixel = map.getSize().divideBy(2);
        const offset = centerPixel.subtract(markerPixel);
        
        // Set the view with calculated padding to perfectly center the marker
        map.setView(markerLatLng, map.getZoom(), {
            animate: true,
            duration: 0.5,
            paddingTopLeft: [offset.x, offset.y],
            easeLinearity: 0.25
        });
        
        marker.openPopup();
        marker.bringToFront();
        
        if (currentDisplayMode === 'search') {
            createAllMarkers(true);
            currentDisplayMode = 'all';
        }
    }

    function updateMarkerVisibility(visibleFacilities) {
        markers.forEach((marker, index) => {
            const shouldShow = visibleFacilities.includes(allFacilities[index]);
            marker.setOpacity(shouldShow ? 1 : 0);
        });
    }

    function zoomToVisibleMarkers() {
        const visibleMarkers = markers.filter(marker => marker.options.opacity > 0);
        if (visibleMarkers.length > 0) {
            const group = new L.featureGroup(visibleMarkers);
            map.fitBounds(group.getBounds().pad(0.2));
        }
    }

    function zoomToAllVisible() {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.2));
    }

    function hideAllMarkers() {
        markers.forEach(marker => marker.setOpacity(0));
    }

    async function fetchWeather(lat, lon) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=4c455336721b4765a08175859252603&q=${lat},${lon}`);
            return await response.json();
        } catch (error) {
            console.warn("Weather API error:", error);
            return null;
        }
    }

    init();
});