//mau, hector, godwin

//the main thing that i had trouble with was getting the cors proxy to work. It wasnt working for me for a long time, but it ended up starting to work so now im using it

//the proxy stopped working again :D so im using a big object now

const nasaUrl = `https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`

const facilities = document.querySelector('#facilities')
const loc = document.querySelector('#location')

// i did have trouble using async syntax and for loops, so i applied hector's strategy of using the basic fetch syntax

fetch(nasaUrl)
    .then(res => res.json()) // parse response as JSON
    .then(nasaData => {
        nasaData.forEach((x, i) => {
            const lat = nasaData[i].location.latitude
            const lon = nasaData[i].location.longitude
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=0e904a2a7aacc8772e00052c29bf80c8`;
            fetch(weatherUrl)
                .then(res => res.json()) // parse response as JSON
                .then(weatherData => {

                    facilities.innerHTML += `<div> ${nasaData[i].facility} || ${lat} ${lon} || Temp: ${(((weatherData.main.temp - 273.15) * 1.8) + 32).toFixed(1)} F | Humidity: ${weatherData.main.humidity} | Sky: ${weatherData.weather[0].description}</div>`

                })
                .catch(err => {
                    console.log(`error ${err}`)
                });
        })
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

// const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${37.911289}&lon=${-75.469622}&APPID=0e904a2a7aacc8772e00052c29bf80c8`;
// fetch(weatherUrl)
//     .then(res => res.json()) // parse response as JSON
//     .then(weatherData => {

//         facilities.innerHTML = `Temp: ${(((weatherData.main.temp - 273.15) * 1.8) + 32).toFixed(1)} F | Humidity: ${weatherData.main.humidity} | Sky: ${weatherData.weather[0].description}`

//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     });