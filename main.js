//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
//Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.

document.querySelector('button').addEventListener('click', run); //button
// document.getElementById('facilitiesWeather').addEventListener('click', getFacilitiesWeather)



function run() {
    const url = `https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`;

    fetch(url) // calling nasa, with api key + user date
    .then((response) => response.json()) //getting response from data, must be processed
    .then((res) => {
        console.log(res);

        res.forEach((e, i) => {
            const facility = res[i].facility
            const lat = res[i].location.latitude
            const lon = res[i].location.longitude

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=0e904a2a7aacc8772e00052c29bf80c8`
        fetch(weatherUrl) // calling nasa, with api key + user date
        .then((response) => response.json()) //getting response from data, must be processed
        .then((res) => {

        document.querySelector('div').innerHTML += `<div>${facility} || ${lat} ${lon} || Temp: ${(((res.main.temp -273.15) *1.8) + 32).toFixed(0)}</div>`
        console.log((((res.main.temp - 273.15)*1.8) +32).toFixed(0));  

        })
        .catch((error) => 
        console.log(error));
    })
    .catch((error) => 
        console.log(error));
    })

} 









//Worked on with Maureen Z. and Objects Nasa template hw 
//Worked on with Justin Joshi