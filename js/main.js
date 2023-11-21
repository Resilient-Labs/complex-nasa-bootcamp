//create an event listener for button
document.querySelector('button').addEventListener('click', nasaFacilities)

function nasaFacilities(){
    const url = 'https://data.nasa.gov/resource/gvk9-iz74.json'

    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data)
         for(let i=0; i < data.length; i++){
            let center = data[i].center
            console.log(center)

            let facility = data[i].facility
            console.log(facility)

            let city = data[i].city
            console.log(city)

            let state = data[i].state
            console.log(state)

            let country = data[i].country
            console.log(country)
            
            let lon = data[i].location.longitude
            console.log(lon)

            let lat = data[i].location.latitude
            console.log(lat)

            const apiKey = '0db20bda27a6db57a16cdc50719479a0'
            const apiTwo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
            fetch(apiTwo)
            .then(res => res.json()) // parse response as JSON
            .then(weather => {
                console.log(weather)
                let temp = weather.main.temp
                let f = Math.ceil((temp - 273.15) * 1.8 + 32)
                console.log(f)

                let listCenter = document.createElement('h2') // list facility
                listCenter.innerText = `Center Name: ${center}`
                document.querySelector('.displayAreaFacility').appendChild(listCenter)
                console.log(listCenter.innerText)

                let listFacility = document.createElement('h3')
                listFacility.innerText = `Facility Name: ${facility}`
                document.querySelector('.displayAreaFacility').appendChild(listFacility)

                let listCityStateCountry = document.createElement('li') //list city state and country
                listCityStateCountry.innerText = `${center} is located in ${city}, ${state} - ${country}`
                document.querySelector('.displayAreaFacility').appendChild(listCityStateCountry)
                console.log(listCityStateCountry.innerText)

                let listWeather = document.createElement('li') //li will list the current weather
                listWeather.innerText = `The current temperature is: ${f}°F`
                document.querySelector('.displayAreaFacility').appendChild(listWeather)
                console.log(listWeather.innerText)

            })
 
         }


})

    .catch(err => {
        console.log(`error ${err}`)
});
}

