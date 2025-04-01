const APIKEY = 'f9f3b037a4d4927b83eaf181cd38472e'
let latitude
let longitude

fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
    .then(res => res.json())
    .then(data => {
        console.log('first API data', data)

        let nameOfCenter = document.querySelector('.list1')
        for (let i = 0; i < data.length; i++) {
            const name = document.createElement('li')
            name.innerHTML = data[i].center
            document.querySelector('ul').appendChild(name)
        }

        let nameOfCity = document.querySelector('.list2')
        const centers = []
        for (let i = 0; i < data.length; i++) {
            const location = document.createElement('li')
            location.innerHTML = data[i].city
            document.querySelector('ul').appendChild(location)

            latitude = data[i].location.latitude,
            longitude = data[i].location.longitude

            console.log(latitude, longitude)

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`)
                .then(res => res.json())
                .then(data2 => {
                    console.log(data2, data2.main.temp, data2.weather[0].description)

                    let weatherInCity = document.querySelector('.list3')
                    for (let i = 0; i < data2.weather.length; i++) {
                        console.log(data2.weather[i].description, 'hello')
                        const weather = document.createElement('li')
                        weather.innerHTML = data2.weather[i].description
                        document.querySelector('ul').appendChild(weather)
                    }
                })
                .catch(err => {
                    console.error(`error ${err}`)
            })
        }
    })
    .catch(err => {
        console.error(`error ${err}`)
    })