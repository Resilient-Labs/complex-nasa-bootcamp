const url = `https://data.nasa.gov/resource/gvk9-iz74.json`

fetch(url)
    .then(res => res.json())
    .then(data => {
        // display all 485 NASA facilities

        data.forEach(facility => {
            console.log(facility)
            let name = facility.facility
            let center = facility.center
            let lon = facility.location.longitude
            let lat = facility.location.latitude
            let zipcode = facility.zipcode.substring(0,5)
            const url2 = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=unknown&units=imperial`

            fetch(url2)
                .then(res2 => res2.json())
                .then(data2 => {
                    let temp = data2.main.temp
                    let weather = data2.weather[0].description
                    document.querySelector('p').innerHTML += `<h2>🚀${name} at ${center}</h2><p>Location: Located at ${lon}, ${lat}</p> It is currently ${temp}°F with ${weather}.<br>`
                })
                .catch(err2 => console.log(err2))
                
            
        })
    })
    .catch(err => console.log(err))

