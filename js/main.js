document.querySelector('button').addEventListener('click', doThing) /* create event listener for the button */

import { weatherApiKey } from "./apiKeys.js"


function doThing() {
    let url = `https://data.nasa.gov/resource/gvk9-iz74.json`
    let facilityCity;
    
    fetch(url)
        .then(res => res.json())
        .then(dataNASA => {
            console.log(dataNASA)
            dataNASA.forEach(facility => {
                return fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${facility.location.latitude},${facility.location.longitude}&aqi=no`)
                    .then(res => res.json())
                    .then(dataWeather => {
                        const h4 = document.createElement("h4")
                        const p = document.createElement("p")
                        const p2 = document.createElement("p")
                        const textNodeWeather = document.createTextNode(`Current weather: ${dataWeather.current.temp_f}°F, ${dataWeather.current.condition.text}`)
                        const textNodeFacility = document.createTextNode(facility.facility)
                        const textNodeLocation = document.createTextNode(`Location: ${facility.city}, ${facility.state}`)

                        h4.appendChild(textNodeFacility)
                        p.appendChild(textNodeLocation)
                        p2.appendChild(textNodeWeather)
                        document.querySelector('section').appendChild(h4)
                        document.querySelector('section').appendChild(p)
                        document.querySelector('section').appendChild(p2)
                        
                        console.log(dataWeather)
                    })
            });

        })
        .catch(err => {
            console.log(`Error: ${err}`)
        })
}