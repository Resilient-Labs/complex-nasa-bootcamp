document.querySelector('button').addEventListener('click',getData)

function getData(){
    const nasaUrl = `https://data.nasa.gov/resource/gvk9-iz74.json`

            fetch(nasaUrl)
            .then(res => res.json())
            .then(dataNasa => {
    
                console.log(dataNasa);

                document.querySelector('#info').innerHTML = ' '
                    for(let j = 0; j < dataNasa.length; j++){
                        let lat = dataNasa[j].location.latitude
                        let lon = dataNasa[j].location.longitude
                        let weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3fbb5c3742691a7504afe6074ae37b51`
                        
                        // bc12083e70d2d22298c2df1cec7101d9
                        //5d7ca861b5385b7079625622471d1de6
                    
                        fetch(weather)
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

