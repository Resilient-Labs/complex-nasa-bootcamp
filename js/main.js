// psuedo code

// User presses search and all facilities and local weather pops up
// Get facility info and zipcode from nasa api
// Use facility info to get local weather and append to list text
// Catch errors

// dom elements
let urlFacility = "https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json";
let ul = document.querySelector("ul");
const section = document.querySelector("section"); // show loading in section
document.querySelector("button").addEventListener("click", goFetch);

// show issue alert upon dom load
window.addEventListener("DOMContentLoaded", () => {
  alert("Issues with NASA API. May be slow loading times.");
});

// fetch facility name, zipcode, and info
function goFetch() {
    ul.innerHTML = ""; //empty list
    section.innerText = "Loading..."; // show loading message

    fetch(urlFacility) //fetch facility info
    .then(res => res.json())
    .then(dataFacility => {
        section.innerText = ""; // clear loading message once data renders
        dataFacility.forEach(facilityInfo => {
        let name = facilityInfo.facility;
        let zipcode = facilityInfo.zipcode;
        let urlWeather = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&appid=7ca999a90b412050fed193b3c8ad3a26`;

// append weather text from weather api call
    fetch(urlWeather)
    .then(res => res.json())
    .then(dataWeather => {
        let temp = dataWeather.main.temp;
        let city = dataWeather.name;
        let li = document.createElement('li');
        li.innerText = `We are looking at ${name} in ${city} city. Nice! The temperature is ${temp}F°`;
        ul.appendChild(li);
    })

    .catch(err => {
        console.log(`Cannot load weather data ${err}`);
    })
    })
    })

    .catch(err => {
        alert("NASA facilities failed to load right now. Try refreshing in a few seconds.");
        console.log(`Cannot load nasa facilties ${err}`);
    });
}

// Citation:
// Guidance from Google AI Overview
// Referenced from Tutorial - https://www.youtube.com/watch?v=b5rjEW-_6po and https://www.youtube.com/watch?v=G7XJRLaq2Cw

