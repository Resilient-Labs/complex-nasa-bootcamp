// http://api.weatherapi.com/v1/current.json?key=7cc0e756e30d4715ac163541262809&q=London&aqi=no
// https://data.nasa.gov/docs/legacy/gvk9-iz74.json
//"https://cors.io/?url=https://data.nasa.gov/resource/gvk9-iz74.json";

//const dataParse=JSON.parse(data.body)

//const NASA_URL =
// "https://cors.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json";

// const WEATHER_KEY =
// "7cc0e756e30d4715ac163541262809";

// const WEATHER_URL =
// "https://api.weatherapi.com/v1/current.json";


const nasaURL ="https://cors.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json"
const key = "7cc0e756e30d4715ac163541262809"

let dataParse = [];

fetch(nasaURL)
    .then(response => response.text())
    .then(data => {

    let result = JSON.parse(data)
    dataParse = JSON.parse(result.body)
        dataParse.forEach((facility, i) => {
        facilitySelect.innerHTML +=`<option value="${i}">${facility.center}</option>`
        });
    });

searchButton.onclick = function() {
    let choice = facilitySelect.value;
    facilitiesBox.innerHTML = "";

    if (choice === "all") {
    dataParse.forEach(facility => {
        facilitiesBox.innerHTML += 
        `<div class="facility">
            <h3>${facility.center}</h3>
            <p>${facility.city}, ${facility.state}</p>
            </div>`
        });

        weather.innerHTML = 
        `<h2>Weather</h2>
        <p>Select one facility to see its weather.</p>`;
    }else {
 let facility = dataParse[choice];
    facilitiesBox.innerHTML = 
    `<div class="facility">
        <h2>${facility.center}</h2>
        <p>${facility.city}, ${facility.state}</p>
        </div>`

        fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${facility.city}`)
        .then(response => response.json())
        .then(data => {

            weather.innerHTML = 
            `<h2>Current Weather</h2>
             <p>${facility.center}</p>
            <p>Temperature: ${data.current.temp_f}°F</p>`
    });
}
};