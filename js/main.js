//Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location,
//and the weather at the facility currently. 

function nasaFacilityLocationWeather(){
    
    fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
    .then(res => res.json())
    .then(data => {
        console.log()
        for(let i = 0; i < 5; i++){
            const uL = document.querySelector('ul')
            const lI = document.createElement('li')
            uL.appendChild(lI)
            const lat = data[i].location.latitude
            const lon = data[i].location.longitude
            
        
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ce36ea6b2c1bdfa3f088b12871d892ff`)
            .then(res => res.json())
            .then(data2 => {
                let kalVersion = data2.main.temp
                let conversionTemp = 1.8*(kalVersion-273) + 32
                 
                lI.innerText = `Facility: ${data[i].facility} | Location: ${lat}, ${lon} | Weather: ${Math.floor(conversionTemp)}`
            })
            .catch(err => {
                console.log(`error ${err}`)
            })
        }
        
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}

nasaFacilityLocationWeather()