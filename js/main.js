// button reference 
const searchButton = document.getElementById('searchFacilities');

// add event listener to the button
searchButton.addEventListener('click', getFacilities);

// OpenWeatherMap API Key
const weatherApiKey = 'feb66035e870d60ca8281c12b2f8108a';

function getFacilities() {
  const inputState = document.getElementById('stateInput').value.trim().toLowerCase();

  // fetch NASA facility areas
  // https://catalog.data.gov/dataset/nasa-facilities-api - information on nasa facility local.
  fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
    .then(res => res.json())
    .then(data => {
      // clear results
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';

      // loop through each facility
      data.forEach(facility => {
        const name = facility.facility;
        const city = facility.city;
        const state = facility.state;
        const lat = facility.location?.latitude;
        const lon = facility.location?.longitude;

        const facilityState = state?.toLowerCase();

        if (!inputState || facilityState === inputState) {
          if (lat && lon) {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`;

            // fetch url
            fetch(weatherUrl)
              .then(res => res.json())
              .then(weatherData => {
                const weather = weatherData.weather[0].description;
                const temp = weatherData.main.temp;

                const card = document.createElement('div');
                card.classList.add('facility-card');

                const facilityName = document.createElement('h2');
                facilityName.textContent = name;

                const location = document.createElement('p');
                location.textContent = `${city}, ${state}`;

                const weatherInfo = document.createElement('p');
                weatherInfo.textContent = `Weather: ${weather}, ${temp}°F`;

                // append elements to the card
                card.appendChild(facilityName);
                card.appendChild(location);
                card.appendChild(weatherInfo);

                // append card to results
                resultsContainer.appendChild(card);
              })
              .catch(err => console.error(`Weather fetch failed for ${name}:`, err));
          }
        }
      });
    })
    .catch(err => console.error('Error loading NASA facilities:', err));
}
