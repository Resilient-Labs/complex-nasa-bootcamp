import weatherApiKey from "./apiKey.js";

const apiKey = weatherApiKey.API_KEY;

function getFacilityWeather() {
  const facilitySection = document.querySelector("#facilitySection");

  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then((response) => response.json())
    .then((nasaData) => {
      nasaData.forEach((item) => {
        const facilityUl = document.createElement("ul");

        const facilityName = document.createElement("li");
        facilityName.innerText = item.facility;

        const facilityLocation = document.createElement("li");
        facilityLocation.innerText = item.city;

        facilityUl.append(facilityName, facilityLocation);
        facilitySection.appendChild(facilityUl);

        fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${item.location.latitude},${item.location.longitude}&aqi=no`
        )
          .then((response) => response.json())
          .then((weatherData) => {
            // console.log(temp);
            let temp = Math.floor(weatherData.current.temp_f);
            const facilityTemp = document.createElement("span");
            facilityTemp.innerText = `Temp: ${temp}°F`;
            facilityUl.appendChild(facilityTemp);
          });
      });
    })
    .catch((err) => {
      console.log(`error ${err}`); // `Error: fetching weather for ${city}
    })
    .catch((err) => {
      console.log(`error ${err}`); // `Error fetching NASA Facilities`
    });
}

getFacilityWeather();
