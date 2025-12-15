//declare variables
const weatherAPIKey = "b9547c52703b8f8fa2b611a536ed9a41"
const nasaFacilities = document.getElementById('nasaFacilities');

//get NASA facilities
function getNASAFacilities() {
    fetch('https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json').then((res) => res.json())
        .then((data => {
            data.forEach(element => {
                getWeather(element);
            });
        }))
        .catch((err) => console.error(err));
}

//get the weather
function getWeather(data) {
    let weatherUrl = `https:api.openweathermap.org/data/2.5/weather?lat=${data.location.latitude}&lon=${data.location.longitude}&units=imperial&appid=${weatherAPIKey}`;
    fetch(weatherUrl).then((res) => res.json())
        .then((weatherdata => {
            nasaFacilities.innerHTML +=
                `<li>${data.facility} - ${data.city}, ${data.state}. Current Weather: ${weatherdata.weather[0].description} and Temp: ${weatherdata.main.temp} </li>`;
            sortCenter()
        }))
}

//M.Kazin
function sortCenter() {
    Array.from(nasaFacilities.children).sort((centerA, centerB) => centerA.innerText > centerB.innerText ? 1 : -1)
        .forEach(center => nasaFacilities.appendChild(center))
}

getNASAFacilities()


//Citation: Marquis