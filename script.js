/*
get the api 
proxy the url api to bypass CORS

get the location of the facilities, weather, and location

loop through all facilities and render cards for each
- use long and lat in the weather API

*/

const proxyUrl = 'https://api.allorigins.win/raw?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json';

    function getLocation(item) {
    const city = item.city || '';
    const state = item.state || '';
    const zip = item.zipcode || '';

    let locationStr = '';
    if (city) {
        locationStr += city;
    }
    if (state) {
        locationStr += (locationStr ? ', ' : '') + state;
    }
    if (zip) {
        locationStr += (locationStr ? ' ' : '') + zip;
    }
    if (!locationStr && item.location) {
        locationStr = `${item.location.latitude || ''}, ${item.location.longitude || ''}`;
    }
    return locationStr || 'Location unavailable';
    }


    async function loadWeather(lat, lon, element) {
    try {
        const weatherUrl = `https://wttr.in/${lat},${lon}?format=j1`;
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const weatherData = await response.json();
        const temp = weatherData.current_condition[0].temp_F;
        const desc = weatherData.current_condition[0].weatherDesc[0].value;
        element.textContent = `Weather: ${temp}°F, ${desc}`;
    } catch (error) {
        console.error('Weather fetch error:', error);
        element.textContent = 'Weather: Unavailable';
    }
    }

    // fetch the api proxxy url
    fetch(proxyUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('total in dataset:', data.length);
        console.log('All records:', data);

        const list = document.getElementById('facilities-list');
        // loop over each item and create an element for each item and then put in the html
        data.forEach(item => {
            const li = document.createElement('li');
            const facilityName = `${item.center || ''} ${item.facility || ''}`.trim() || 'Unknown Facility';
            const locationStr = getLocation(item);
            li.innerHTML = `
                <h3>${facilityName}</h3>
                <br>
                <p>Location: ${locationStr}</p>
                <p>Weather: Loading...</p>
            `;
            list.appendChild(li);

            // Load weather asynchronously
            if (item.location && item.location.latitude && item.location.longitude) {
                const weatherP = li.querySelector('p:last-child');
                loadWeather(item.location.latitude, item.location.longitude, weatherP);
            } else {
                li.querySelector('p:last-child').textContent = 'Weather: Location data unavailable';
            }
        })
    })
    .catch(error => {
        console.error('Fetch error:', error)
    })