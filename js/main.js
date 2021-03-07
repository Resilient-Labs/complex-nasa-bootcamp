document.querySelector('button').addEventListener('click', getLocationAndTemperature)

document.querySelector('input').addEventListener('keypress', runGetLocationAndTemperature)

function runGetLocationAndTemperature(e){
    if(e.keyCode === 13){
        e.preventDefault()
        getLocationAndTemperature()
    }
    
}


function getLocationAndTemperature() {

const urlNasa = "https://data.nasa.gov/resource/gvk9-iz74.json"


fetch(urlNasa)

    .then(response => response.json())

    .then(nasaData => {


        for(nasaFacility of nasaData) {


            let facilityName = nasaFacility.center

            let city = nasaFacility.city

            let state = nasaFacility.state

            let country = nasaFacility.country

            let zipcode = nasaFacility.zipcode

            const urlWeather = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=e89c759b0eeedfb883f2c032ba235e16`

            fetch(urlWeather)

                .then(response => response.json())

                .then(dataWeather => {

                    let temperature = dataWeather.main.temp

                    let parent = document.querySelector('.ulNasa')

                    let child = document.createElement('li')
        
                    let information = `FACILITY NAME: ${facilityName} LOCATION: ${city}, ${state}, ${country}, ${zipcode} TEMPERATURE: ${temperature}`
        
                    child.innerText = information 
        
                    parent.append(child)


            })
            

        }

    })


    .catch(err => {
        console.log(`error ${err}`)
    });


}








