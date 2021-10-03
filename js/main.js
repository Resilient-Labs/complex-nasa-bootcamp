document.querySelector('button').addEventListener('click',getPictureOfDay)

function getPictureOfDay(){
    const nasaLocationUrl = `https://data.nasa.gov/resource/gvk9-iz74.json`

            fetch(nasaLocationUrl)
            .then(res => res.json())
            .then(dataNasa => {
                // for (let i = 0; i <= 5; i++){
                // }
                console.log(dataNasa);

                document.querySelector('#info').innerHTML = ' '
                    for(let j = 0; j < dataNasa.length; j++){
                        let lat = dataNasa[j].location.latitude
                        let lon = dataNasa[j].location.longitude
                        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bc12083e70d2d22298c2df1cec7101d9`
                    
                        fetch(weatherUrl)
                        .then(res => res.json())
                        .then(dataWeather => {
                           
                            console.log(dataWeather)
                        
                          let str = `<tr><td class="facilityName">${dataNasa[j].center}</td><td class="facilityLocation">${dataNasa[j].city},${dataNasa[j].state}</td><td class="weather">${dataWeather.weather[0].description}, ${dataWeather.main.temp}</td></tr>`

                          document.querySelector('#info').innerHTML += str
                                
                        
                        })
                    }   
            })                    
    .catch(err => { 
        console.log(`error ${err}`) 
    });
}

//Group: Roxana L, David N, Miriam, Shannon M, Alexa M