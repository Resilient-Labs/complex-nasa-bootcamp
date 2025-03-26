//https://www.weatherapi.com/api-explorer.aspx#forecast
//https://data.nasa.gov/resource/gvk9-iz74.json


/*
get all facility names on load
dynamically populate drop down -> option

on click -> get value (center name) -> 
display name, location (address), weather (get location.latitude & location.longitude input into weather and then get weather)
*/

import { key } from './key.js'

let nasaLocations = 'https://data.nasa.gov/resource/gvk9-iz74.json'


class nasaFacilityInfo {
    constructor(facility, center, latitude, longitude, city, state, zipcode) {
        this.facility = facility;
        this.center = center;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
    }
}

function getData(nasaFacilities) {
    let facilityValue = document.querySelector('select').value
    document.querySelector('h2').innerText = nasaFacilities[facilityValue].facility
    document.querySelector('h3').innerText = `${nasaFacilities[facilityValue].center} located at ${nasaFacilities[facilityValue].city}, ${nasaFacilities[facilityValue].state}`


    let location = `${nasaFacilities[facilityValue].latitude},${nasaFacilities[facilityValue].longitude}`
    let weatherURL = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=1&aqi=no&alerts=no`

    fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
            document.querySelector('p').innerText = `Current conditions are ${data.current.condition.text}. It is a temperature of ${data.current.feelslike_c}C/${data.current.feelslike_f}F. There are winds of ${data.current.gust_kph}kph/${data.current.gust_mph}mph and the humidity is ${data.current.humidity}%`

        })
}

fetch(nasaLocations)
    .then(res => res.json())
    .then(data => {
        let nasaFacilities = []
        data.forEach((a) => nasaFacilities.push(new nasaFacilityInfo(a.facility, a.center, a.location.latitude, a.location.longitude, a.city, a.state, a.zipcode)))
        let select = document.querySelector('select');

        nasaFacilities.forEach((a, index) => {
            select.options[select.options.length] = new Option(nasaFacilities[index].facility, index);
        })



        document.querySelector('select').addEventListener('change', () => getData(nasaFacilities))
    })














/*
import key from './key.js'
let url = `https://api.nasa.gov/planetary/apod?api_key=${key}`

//to get the max date = today
document.querySelector('input').max = new Date().toLocaleDateString('en-ca')
// console.log(document.querySelector('input').max)

//run function getAPOD when button is clicked (if no date is added default is today)
document.querySelector('button').addEventListener('click', getAPOD)

function loading(ms) {
    return new Promise(loaded => setTimeout(loaded, ms));
}

function getAPOD() {
    document.querySelector('h3').innerText = 'Your photo is on it\'s way! 🚀'; //would like to add a little animation hmm
    document.querySelector('p').innerText = ''
    document.querySelector('img').src = ''
    loading(1000).then(() => {
    let date = document.querySelector('input').value
    fetch(`${url}&date=${date}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.querySelector('h3').innerText = data.title
        document.querySelector('p').innerText = data.explanation
        if (data.media_type==='image') {
            document.querySelector('iframe').classList.add('hidden')
            document.querySelector('img').classList.remove('hidden')
            document.querySelector('img').src = data.url
            console.log(document.querySelector('iframe').classList, document.querySelector('img').classList)
        } else {
            document.querySelector('img').classList.add('hidden')
            document.querySelector('iframe').classList.remove('hidden')
            document.querySelector('iframe').src = data.url
            console.log(document.querySelector('iframe').classList, document.querySelector('img').classList)
        }
    })
    })
}

*/