document.querySelector('button').addEventListener('click', getLocales);

let url =
  'https://cors.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json';

//placeholder url = https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&models=ncep_gfs_seamless&current=apparent_temperature&forecast_days=7&temperature_unit=fahrenheit

function getLocales() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);

      const restructuredData = JSON.parse(data.body);

      console.log(restructuredData);

      restructuredData.map((element) => {
        let longitude = element.location.longitude;
        let latitude = element.location.latitude;
        let facility = element.center;
        let city = element.city;
        let secondUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&models=ncep_gfs_seamless&current=apparent_temperature&forecast_days=7&temperature_unit=fahrenheit`;

        getTemps(secondUrl, facility, city);
      });
    });
}

function getTemps(secondUrl, facility, city) {
  fetch(secondUrl)
    .then((res) => res.json())
    .then((newData) => {
      console.log(newData);

      const weather = document.createElement('h2');
      const htmlSection = document.querySelector('#locations-display');

      weather.textContent = `The temperature at ${facility}, in ${city}, currently sits at ${newData.current.apparent_temperature}°F`;

      htmlSection.appendChild(weather);
    });
}
