let i = 0
fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(res => res.json())
    .then(data => {
        const facilities = []
        //console.log(data)
        while (i < data.length) {

            let longitude = data[i].location.longitude
            let latitude = data[i].location.latitude
            let facility = data[i].facility
            let center = data[i].center
            i++
            fetch(`https://api.weatherapi.com/v1/current.json?key=c38745e9233c44d6b38143450221510&q=${latitude},${longitude}&aqi=no`)
                .then(res => res.json())
                .then(weather => {
                    let currentWeather = weather.current.condition.text
                    let currentTemp = weather.current.temp_f
                    let city = weather.location.name
                    let state = weather.location.region
                   facilities.push(`${facility} is located in ${city}, ${state} at the ${center}. It is currently ${currentWeather} and ${currentTemp}°F.\n\n`)
                   
                })
                
        }
        //console.log(facilities)

        document.querySelector('button').addEventListener('click', Test)

        function Test() {
        
        document.querySelector('p').innerText = facilities.join('') //https://www.folkstalk.com/2022/09/javascript-array-to-string-remove-comma-with-code-examples.html#:~:text=You%20can%20use%20the%20join,the%20commas%20with%20a%20space.
    }
    })

    .catch(err=> {
        console.log(`error${err}`)
    })
    

