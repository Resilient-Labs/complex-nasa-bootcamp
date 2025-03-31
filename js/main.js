// Select the button and add an event listener
const button = document.getElementById('button');
button.addEventListener('click', fetchFacilitiesAndWeather);

function fetchFacilitiesAndWeather() {
  const nasaUrl = "https://data.nasa.gov/resource/gvk9-iz74.json";
  const weatherApiKey = "04dda99c7403b0832bda2fdbde144552";
  const container = document.querySelector('.facility');

  // Fetch NASA Facilities
  fetch(nasaUrl)
    .then(response => response.json())
    .then(facilities => {
      console.log(facilities);

      facilities.forEach(facility => {
        const { facility: name, city, state, location } = facility;

        if (location?.latitude && location?.longitude) {
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${weatherApiKey}&units=metric`;

          // Fetch Weather Data
          fetch(weatherUrl)
            .then(weatherResponse => weatherResponse.json())
            .then(weatherData => {
              const weatherDescription = weatherData?.weather?.[0]?.description || 'Unknown';
              const temperature = weatherData?.main?.temp || 'N/A';

              // Display Data
              const facilityElement = document.createElement('div');
              facilityElement.classList.add('facility-item');
              facilityElement.innerHTML = `
                <h3>${name}</h3>
                <p>Location: ${city}, ${state}</p>
                <p>Weather: ${weatherDescription}, ${temperature}°C</p>
              `;
              container.appendChild(facilityElement);
            })
            .catch(weatherError => console.log(`Error fetching weather for ${name}:`, weatherError));
        } else {
          console.log(`Missing location data for: ${name}`);
        }
      });
    })
    .catch(error => console.log("Error fetching NASA facilities:", error));
}