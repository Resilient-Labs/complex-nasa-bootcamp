//Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.

// declare all variables for nasa facilities api and for weather api

// let's move this within the function
// let urlNasa = `https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`;

const nasaFac = document.getElementById("nasaFac");
const facility = document.getElementById("facility");
const facCenter = document.getElementById("facCenter");
const state = document.getElementById("state");
const zip = document.getElementById("zip");

//used to create variables for the urlWeather
const lon = document.getElementById("latitude");
const lat = document.getElementById("longitude");

const weatherApiKey = "a4342a4e03d652a49f6f999e6dd07493";
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");

let lonVal = "";
let latVal = "";

// make function for nasa facilities api and weather within api

function getNasaFacilities() {
  let urlNasa = `https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`;

  fetch(urlNasa)
    .then((res) => res.json())
    .then((data) => {
      console.log("fetching data from", data);
      facCenter.innerHTML = data[0].center;
      facility.innerHTML = data[0].facility;
      state.innerHTML = data[0].state;
      zip.innerHTML = data[0].zipcode;
      lonVal = data[0].location.longitude;
      latVal = data[0].location.latitude;

      data.forEach((element) => {
        // created a method here to keep things cleaner
        getWeather(element);
      });
    })
    .catch((err) => console.error("error", err));
}

function getWeather(element) {
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${element.location.latitude}&lon=${element.location.longitude}&appid=${weatherApiKey}&units=imperial`;

  fetch(urlWeather)
    .then((res) => res.json())
    .then((weatherdata) => {
      console.log(weatherdata);
      temp.innerHTML = `Current temperature: ${Math.round(
        weatherdata.main.temp
      )}°F`;
      weather.innerHTML = `Current weather: ${weatherdata.weather[0].description}`;
      nasaFac.innerHTML += `<li>The facility is called ${element.facility} and the center is named the ${element.center}, found in the state of ${
        element.state
      }. Current weather: ${
        weatherdata.weather[0].description
      } Current temperature: ${Math.round(weatherdata.main.temp)}°F - Zip Code: ${zip.innerText} </li>`;
    });
}

getNasaFacilities();

// work completed with the help of Rumi's bf and classmates