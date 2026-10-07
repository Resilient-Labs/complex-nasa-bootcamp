const URL = 'https://data.nasa.gov/docs/legacy/gvk9-iz74.json';
const result = document.querySelector('.facilities')

document.querySelector('.btn').addEventListener('click', getFacilities)

function getFacilities() {

    fetch(URL)
    .then(res => res.json())
    .then(places => {
        places.forEach (place => {
            const center = place.center  
            const city = place.city
            const state = place.state
            const country = place.country

            const lat = place.location.latitude
            const long = place.location.longitude
            coordinate(center,city,state,country,lat,long)
        })
     
    })
    .catch(err => console.error("NASA API error", err))
}

function coordinate(center,city,state,country,lat,long) {
  



const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=apparent_temperature&temperature_unit=fahrenheit`

fetch(weatherAPI)
.then(res => res.json())
.then(data => {
    console.log(data)
        const weather = data.current.apparent_temperature
        const facilities = document.querySelector('.facilities')
        const text = document.createElement('p')
        text.textContent = `${center},${city},${state},${country},${weather}`
        

    facilities.appendChild(text)
})
.catch(err => {
    console.error("ERROR WITH THE WEATHER API", err)
    weather.textContent = "Weather was unable to respond"
})

}







