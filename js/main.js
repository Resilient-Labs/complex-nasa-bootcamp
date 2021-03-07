document.querySelector('button').addEventListener('click', getFacilityWeather)

function fetchFacilities() {
  return fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
    .then(parseJSON)
}

function fetchWeather(cityName) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d218eddcd1e60fb3ac910f956a8e089c`)
    .then(response => response.json()) // parse response as JSON
}

// parse the server's response body as a JavaScript Object (JSON)
function parseJSON(response) {
  return response.json()
}

function cityIsValid(cityName) {
  return !invalidCities.includes(cityName)
}
const invalidCities = [`Kennedy Space Center`, `Stennis Space Center`, `Wallops Island`, `Moffett Field`]

function getFacilityWeather() {
  fetchFacilities().then(facilities => {
    facilities.forEach((facility) => {
      let cityName = facility.city

      if (cityIsValid(cityName)) {
        fetchWeather(cityName).then(weatherData => addWeatherToTable(weatherData, facility))
      }
    })
  })
}

function addWeatherToTable(weatherData, facility) {
  if (weatherData.cod !== `404`) {
    let fahrenheit = Math.round((weatherData.main.temp - 273.15) * 1.8 + 32) + `F` + `°`;

    let tableBody = document.querySelector(`tbody`)
    tableBody.innerHTML += `<tr>
      <td>${facility.center}</td>
      <td>${facility.city}</td>
      <td>${facility.state}</td>
      <td>${fahrenheit}</td>
      <td>${weatherData.weather[0].description}</td>
    </tr>`
  } else {
    console.log(`Weather data unavailable for ${facility.city}`)
  }
}
