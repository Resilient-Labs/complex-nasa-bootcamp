document.querySelector('button').addEventListener('click', getFacilities)
let table = document.querySelector('table')

function getFacilities() {
    fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        for (let i=0; i<data.length; i++) {
            let row = table.insertRow(-1)
            let centerCol = row.insertCell(0)
            let facilityCol = row.insertCell(1)
            let locationCol = row.insertCell(2)

            centerCol.innerText = data[i].center
            facilityCol.innerText = data[i].facility
            locationCol.innerText = `${data[i].city}, ${data[i].state} ${data[i].zipcode}`

            let weatherCol = row.insertCell(3)
            getWeather(data[i].zipcode, weatherCol)
        }
    })

    .catch(err => {
        console.log(`error ${err}`)
    })
}

function getWeather(zipcode, weatherCol) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=27060f3658d846fb800103918231910&q=${zipcode}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        weatherCol.innerText = `${data.current.temp_f} °F \n ${data.current.condition.text}`
    })
    
    .catch(err => {
        console.log(`error ${err}`)
    })
}