//Goal: Use NASA's API to return all of their facility locations (~400). Display 
//the name of the facility, its location, and the weather at the facility currently.
let nasaUrl = 'https://data.nasa.gov/resource/gvk9-iz74.json'

fetch(nasaUrl)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        for(let i = 0; i < 485; i++){
            let list = document.getElementById('list')
            const li = document.createElement('li')
            //li.innerText = "Name: " + data[i].center
            list.appendChild(li)
            let h3 = document.createElement('h3')
            h3.innerText = data[i].center
            li.appendChild(h3)
            let h4 = document.createElement('h4')
            h4.innerText = `${data[i].city}, ${data[i].state}, ${data[i].country}`
            li.appendChild(h4)

            let long = data[i].location.longitude
            let lat = data[i].location.latitude
            let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph`
            fetch(weatherUrl)
            .then(res => res.json()) //parse response as JSON
            .then(weatherData => {
                let p = document.createElement('p')
                p.innerText = `Temperature: ${weatherData.current_weather.temperature} \u00B0F, Windspeed: ${weatherData.current_weather.windspeed}mph`
                li.appendChild(p)
            })
        }
    })
    .catch(err => {
    console.log(`error ${err}`)
    });