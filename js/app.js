butt = document.querySelector('#thebutt')

const nasaUrl = 'https://data.nasa.gov/resource/gvk9-iz74.json';
const table = document.querySelector('table');

function getNasa() {
  fetch(nasaUrl)
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const row = document.createElement('tr')
        const facilityCell = document.createElement('td')
        const locationCell = document.createElement('td')
        const weatherCell = document.createElement('td')

        facilityCell.innerText = data[i].facility
        locationCell.innerText = `${data[i].city}, ${data[i].state}`
        getWeather(data[i].zipcode, weatherCell)

        row.appendChild(facilityCell)
        row.appendChild(locationCell)
        row.appendChild(weatherCell)
        table.appendChild(row)
        
      }
      
    })
    .catch (err => {
      console.log(`error ${err}`);
    })
}

function getWeather(zipcode, weatherCell) {
  const weatherUrl = (`https://api.weatherbit.io/v2.0/current?postal_code=${zipcode}&key=weatherApi&include=minutely&units=I`)
    fetch(weatherUrl)
    .then(res => res.json())
    .then(data => {
      const temperature = data.data[0].temp
      weatherCell.innerText = `${temperature}°F`
    })
}
butt.addEventListener('click', getNasa)
