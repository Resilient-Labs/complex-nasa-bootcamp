/**
 * Show locations of nasa facility, its name and temperature at that location
 * Ryan helped me with this project
 */

//event listener for the get date button
document.querySelector('button').addEventListener('click', run)

//create an object to store the data
const facilitiesData = {}

async function run() {
    // const zip = document.querySelector('input').value

    const urlNasa = `https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`
    await fetch(urlNasa)
        .then(res => res.json())
        .then(data => {

            data.forEach((facility) => {
                const state = facility.state
                const city = facility.city
                const country = facility.country
                // console.log(facility)
                facilitiesData[facility.center] = {
                    name: `Name: ${facility.center}`,
                    city: `City: ${facility.city}`,
                    state: `State: ${facility.state}`,
                    country: `Country: ${facility.country}`
                }
                getWeather(city, state, country, facility.center)
            });
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}
async function getWeather(city, state, country, facilityName) {
    const apiKey = 'ac7a25cc1fd6223acd06a17e1aeccd7f'
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}&units=imperial`
    const listFromDom = document.getElementById("facilities");
    await fetch(urlWeather)
        .then(res => res.json())
        .then(weatherData => {
            facilitiesData[facilityName].temp = `Temp at location: ${weatherData.main.temp}° F`
            // console.log(weatherData)
            // console.log(facilitiesData)
            
            for (const key in facilitiesData) {
                if (facilitiesData[key].temp) {
                    const liElement = document.createElement('li')
                    liElement.textContent = `${facilitiesData[key].name} ${facilitiesData[key].city} ${facilitiesData[key].state} ${facilitiesData[key].temp}`
                    listFromDom.appendChild(liElement)
                }
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}
