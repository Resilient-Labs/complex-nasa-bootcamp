let url = 'https://data.nasa.gov/resource/gvk9-iz74.json'

fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for (let i = 0; i < 485; i++) {
            let ol = document.querySelector('.nasaList')
            const li = document.createElement('li')
            //li.innerText = "Name: " + data[i].center
            ol.appendChild(li)
            let h3 = document.createElement('h3')
            h3.innerText = "Name: " + data[i].center
            li.appendChild(h3)
            let h4 = document.createElement('h4')
            h4.innerText = "State: " + data[i].state
            li.appendChild(h4)

            const key = config.MY_KEY_WEATHER
            let lat = data[i].location.latitude
            let lon = data[i].location.longitude
            let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial` 
            fetch(url2)
                .then(res => res.json())
                .then(data2 => {
                    console.log(data2)
                    let span = document.createElement('span')
                    span.innerText = data2.name + ": " + data2.weather[0].description
                    li.appendChild(span)
                    let p = document.createElement('p')
                    p.innerText = data2.main.temp + " degrees farenheit." + " " + "Feels Like: " + data2.main.feels_like
                    li.appendChild(p)
                })
        }
    })