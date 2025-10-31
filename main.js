//Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.
//Creating key and url variables
//Creating a function to fetch facilities
//Fetching url information
//Catching errors tha may happen
//Displaying facility, city, weather, state and weather information on the DOM

const key = "d23e009d9e3c420522a7d9b1300082d7";
const url = "https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json"

document.querySelector("#fetchFacilities").addEventListener("click", fetchFacilities);

// getWeather();
// fetchFacilities();

function fetchFacilities(){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(element => {
            getWeather(element);
        });
    })
    .catch(error => console.error(error));
}

function getWeather(sun){
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${sun.location.latitude}&lon=${sun.location.longitude}&units=imperial&appid=${key}`
    fetch(weatherUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.querySelector("h2").innerHTML += `<li>${sun.facility} - ${sun.city}, ${sun.state}. Current Weather: ${data.weather[0].description} and Temp: ${data.main.temp} °F</li>`;
    })
    .catch(error => console.error(error));
}







