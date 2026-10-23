//Nasa facilities API URL info: https://data.nasa.gov/dataset/nasa-facilities-api/resource/8da12948-3793-4ec1-b5c6-f95e86fd6021
// returns massive array of objects, need to get location from each object. Location is (latitude, longitude) because then will use weather api and query parameters to get weather information of each Location 

// variable for ul that I'll be appending new Li to
const nasaLocationList = document.getElementById("createdList")
// variables that will be used to add text to each li that I append to ol above
let nasaLocationFacility
let nasaLocationName
let nasaLocationCity
let nasaLocationCountry
let nasaLocationCurrentTemp
let nasaLocationWeatherLastUpdated

// user clicks 'Get Information Now!' button, starts first API fetch
document.querySelector('button').addEventListener('click', getNasaLocations)

// Get array of 485 NASA locations as objects in the array
function getNasaLocations() {
    fetch('https://api.cors.lol/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            getWeatherData(data)
        })
}

// Function runs, after button clicked
function getWeatherData(NASALocations) {
    // for each object in the array of NASALocations, do this:
    NASALocations.forEach(object => {
        let latitude = object.location.latitude
        let longitude = object.location.longitude
        console.log(object)
        console.log(nasaLocationName)
        // using the object lat and long, plug into weather API and fetch the API for each location
        fetch(`https://api.weatherapi.com/v1/current.json?key=633d142d30664e60ba9150029262209&q=${latitude},${longitude}`)
            // Convert the API response from JSON into a JavaScript object
            .then((res) => res.json())
            // work with what came back. Need to store property values in variables to then be able to use later
            .then((secondAPIData) => {
                nasaLocationFacility = object.facility
                console.log(nasaLocationFacility)
                nasaLocationName = object.center
                console.log(nasaLocationName)
                nasaLocationCity = secondAPIData.location.name
                console.log(nasaLocationCity)
                nasaLocationCountry = secondAPIData.location.country
                console.log(nasaLocationCountry)
                nasaLocationCurrentTemp = secondAPIData.current.heatindex_f
                console.log(nasaLocationCurrentTemp)
                nasaLocationWeatherLastUpdated = secondAPIData.current.last_updated
                console.log(nasaLocationWeatherLastUpdated)
                // display nasaLocationName from first API and the 4 variables above from second API
                display(nasaLocationFacility, nasaLocationName, nasaLocationCity, nasaLocationCountry, nasaLocationCurrentTemp, nasaLocationWeatherLastUpdated)
            })
            .catch(error =>
                console.log(error)
            )
    })
}

function display(v1, v2, v3, v4, v5, v6) {
    newListItem = document.createElement('li') //creating new li
    newListItem.innerText = `${v1}, Center = ${v2}, Facility City = ${v3}, Facility Country = ${v4}, Current Temp. = ${v5}, Last Updated = ${v6}`
    // add new li to ul:
    nasaLocationList.append(newListItem)
}