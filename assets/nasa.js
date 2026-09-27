
document.querySelector('button').addEventListener('click', findLocations)
   
function findLocations(){
   
   const apiOne = `https://data.nasa.gov/docs/legacy/gvk9-iz74.json`

    fetch(apiOne)
        .then(res => res.json())
        .then(data => {
            
            console.log(data)

            data.map(info => {
                
                const center = info.center                      ///////////////////////////////////////////
                const city = info.city                          ///////////////////////////////////////////
                const state = info.state                        // Need to create variables to hold info //
                const country = info.country                    //then call it in params of next function//
                const lati = info.location.latitude             ///////////////////////////////////////////
                const long = info.location.longitude            ///////////////////////////////////////////
                const zipCode = info.zipcode
        
                getWeather(center, city, state, country, lati, long, zipCode)
                })
            })
        .catch(err => {
            console.log(`error ${err}`)
            })
}

function getWeather(center, city, state, country, lati, long, zipCode){

    const apiTwo = `https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${long}&models=ncep_gfs_seamless&current=apparent_temperature&forecast_days=7&temperature_unit=fahrenheit`

    fetch(apiTwo)
        .then(res => res.json())
        .then(temp => {
            console.log(temp)

            const temperature = temp.current.apparent_temperature

            const nasaSections = document.querySelector('#section')

            
            const information = document.createElement('p')
            information.textContent = `${center} is located in ${city}, ${state}, ${country} ${zipCode} and the temp is currently ${temperature}°F`
            nasaSections.appendChild(information)
            
            information.classList.add('nasaInfo')
            


    })
}