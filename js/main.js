let weatherApiKey = '2f4aec935846428c9d8ea81a749539b4'
let container = document.querySelector('.container')

let nasaUrl = 'https://data.nasa.gov/resource/gvk9-iz74.json'
fetch(nasaUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            let subcontainer = document.createElement('section')
            container.appendChild(subcontainer)

            let facility = document.createElement('h2')
            facility.innerText = data[i].facility
            facility.classList.add('facility')
            subcontainer.appendChild(facility)

            let location = document.createElement('h3')
            location.innerText = `Location: ${data[i].city}, ${data[i].state} ${data[i].country}`
            location.classList.add('location')
            subcontainer.appendChild(location)

            let lat = data[i].location.latitude
            let lon = data[i].location.longitude
            let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`
            fetch(weatherUrl)
                .then(res => res.json())
                .then(data => {
                    let currentWeather = document.createElement('h4')
                    currentWeather.innerText = `Current Weather: ${data.main.temp}\u00B0F, ${data.weather[0].description}`
                    currentWeather.classList.add('weather')
                    subcontainer.appendChild(currentWeather)
                })
                .catch(err => {
                    console.log(`error ${err}`)
                })
        }
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
