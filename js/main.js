document.querySelector('button').addEventListener('click', getFacility)
let ul = document.querySelector('ul')

function getFacility(){
    const url = `https://data.nasa.gov/resource/gvk9-iz74.json`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            for(let i = 0; i < data.length; i++){
                let center = data[i].center
                let facility = data[i].facility
                let state = data[i].state
                let zipcode = data[i].zipcode

                const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=b9aedf9947d64637bf0185918252803&q=${zipcode}`

                console.log(weatherUrl)
                fetch(weatherUrl)
                    .then(res => res.json())
                    .then(weatherData => {
                        console.log(weatherData)
                        let temperature = weatherData.current.temp_f
                        console.log(temperature)
                        let weather = weatherData.current.condition.text
                        console.log(weather)
                        let li = document.createElement('li')
                        console.log(li)
                        li.innerText = (`Facility ${facility} is in the ${center} located in ${state}. The current weather is ${weather} and it is ${temperature} °F.`)
                        ul.appendChild(li)
                })
                .catch(err => {
                console.log(`error ${err}`)
            });
            }        
        })
        .catch(err => {
            console.log(`error ${err}`)
    });
}