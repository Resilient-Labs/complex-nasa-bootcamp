/*https://github.com/Resilient-Labs/complex-nasa-bootcamp > Use NASA APIs to return all 400+ NASA facilities. Include name, location, and weather at that facility currently. Must be chained; no hard-coding. Has to be the result from the API

API- https://data.nasa.gov/resource/gvk9-iz74.json

*/


import {weather_apiKey} from "./apikey.js"

document.querySelector('#loadFacilities').addEventListener('click', displayList) 

function displayList() {

    const url = `https://data.nasa.gov/resource/gvk9-iz74.json`

    fetch(url) // connect to API
    .then(res => res.json()) // parse resopnse as JSON. res name doesn't matter. Taking response and formatting it in JSON object
    .then(data => { // Outputting a series of things
        console.log(data) // Displays array of objects with details on each location

        for (let i = 0; i < data.length; i++) {
            console.log([i]) // Leave it as is so that it logs all of the facilities
            // console.log(data[i].center)
            // console.log(data[i].location.latitude)
            // console.log(data[i].location.longitude)
            // console.log(data[i].city)
            // console.log(data[i].state)
            // console.log(data[i].zipcode)
            // console.log(data[i].country)
            // console.log(`The ${data[i].center} is located at ${data[i].city}, ${data[i].state}, ${data[i].zipcode}, ${data[i].country}`)

            let element = document.createElement('p');
            element.innerText = `The ${data[i].center} is located at ${data[i].city}, ${data[i].state}, ${data[i].zipcode}, ${data[i].country}. The longitude is ${data[i].location.longitude} and the latitude is ${data[i].location.latitude}`;
            document.querySelector('div').appendChild(element); // Insert in parent element which is the 'div'

            // TESTING WHAT DOESN'T WWORK
            // console.log([data].center) // Displays array of objects with details on each location (replaced 'i' with 'data')
            // console.log([data.center]) // Displays array of objects with details on each location (replaced 'i' with 'data')
            // console.log([i[center]]) // Only logs first element in array [0] and returns error ReferenceError: Can't find variable: center
            // console.log([i][center]) // Only logs first element in array [0] and returns error ReferenceError: Can't find variable: center
            // console.log([i].center) // Undefined
            // console.log([i.center]) // Undefined
        }

    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}

document.querySelector('#generateReport').addEventListener('click', checkWeather) 

function checkWeather() {

        const longitude = document.getElementById('longitudeInput').value
        const latitude = document.getElementById('latitudeInput').value

        const apiKey = weather_apiKey

        const url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}`
        // const url = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lat=${latitude}&lon=${longitude}`
        // const url = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lat=28.538331&lon=-81.378879`

        // Variable that holds API

        fetch(url
            ,{
                // mode: 'no-cors',
                // headers: {
                //     // 'Access-Control-Allow-Origin':'*',
                //     'Content-Type':'application/json',
                //     'x-api-key': apiKey
                // },
             }
        ) // connect to API
        .then(res => res.json()) // parse resopnse as JSON. res name doesn't matter. Taking response and formatting it in JSON object
        .then(data => { // Outputting a series of things
            console.log(data)
            console.log(data.data[0].temp) // Farenheit Temperature
            console.log(data.data[0].wind_cdir) // Wind circular direction
            console.log(data.data[0].clouds) // Clouds
            console.log(data.data[0].vis) // Visibility
            console.log(data.data[0].dewpt) // Dew Point
            console.log(data.data[0].uv) // UV
            console.log(data.data[0].wind_dir) // Wind direction
            console.log(data.data[0].precip) // Precipitation


            document.getElementById('temp').innerText = data.data[0].temp
            document.getElementById('clouds').innerText = data.data[0].wind_cdir
            document.getElementById('visibility').innerText = data.data[0].clouds
            document.getElementById('dewPoint').innerText = data.data[0].dewpt
            document.getElementById('uv').innerText = data.data[0].uv
            document.getElementById('windDir').innerText = data.data[0].wind_dir
            document.getElementById('precip').innerText = data.data[0].precip
            
            // document.getElementById('temp').innerText = data.data[0].temp
            // document.getElementById('city_print').innerText = data.data[0].city_name
            // document.getElementById('state_print').innerText = data.data[0].state_code
            // document.getElementById('country_print').innerText = data.data[0].country_code

        })
}

