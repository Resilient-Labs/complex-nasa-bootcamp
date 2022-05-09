document.querySelector('button').addEventListener('click', getNasa)

function getNasa(){
    let url = `https://data.nasa.gov/resource/gvk9-iz74.json`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    let location = data[i].location
                    let lon = location.longitude
                    let lat = location.latitude
                    let facility = data[i].facility
                    let state = data[i].state
                    let country = data[i].country
                    let nasaListHere = document.querySelector('.nasaList')
                    
                    let apiKey = '1ec409d9f27eff503785651ea68071b1'

                        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                            .then(response => response.json())
                            .then(result => {
                            console.log(result)
                            let tempFaren = ((result.main.temp - 273.15) * 9/5) + 32 
                            let round = tempFaren.toFixed(1)
                            let li = document.createElement('li')
                            li.innerText = `The ${facility} is in ${state}, ${country}. The current temperature is ${round}°F.`
                            nasaListHere.appendChild(li)
        })
        .catch(err => {
            console.log(`error ${err}`)
    });
}
})
}