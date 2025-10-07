// Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.

// on page load Nasa facility location 
// temperature from the will load

let nasaUrl = `https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`
let facilities = document.querySelector('#facilities')

fetch(nasaUrl)
    .then(res => res.json())
    .then(nasaData => {
        console.log(nasaData)

        nasaData.forEach((x, i) => {
            let lon = nasaData[i].location.longitude
            let lat = nasaData[i].location.latitude
            let apiKey = `3ca527700be61b8b5bbc9232e557bd62`
            let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            



            fetch(weatherUrl)
                .then(res => res.json())
                .then(weatherData => {
                    console.log(weatherData)
                    // check weather 

                    document.querySelector("#facilities").innerHTML += `${nasaData[i].facility} || ${lat} ${lon} ||${(((weatherData.main.temp - 273.15) * 9/5) + 32).toFixed(0)};`
                    console.log(weatherData.main.temp)

                    .catch(err => {
                        console.log(`error ${err}`)
                    })})})})

// completed with the help of fellow teammate Justin Joshi of House Hayden