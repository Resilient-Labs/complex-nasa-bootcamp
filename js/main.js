
let akey = 'df401b96871cf27546f462d9f5656698'


function findFacility(){
    //function to get random facility number out of the 485 available
    let facilityNumber = Math.floor( Math.random()*485)

    let url = 'https://data.nasa.gov/resource/gvk9-iz74.json'
    //fetch to get nasa facility name, location and weather.
    fetch(url) 
    .then(res => res.json()) // parse response as JSON 
    .then(data => { 
        //destructing these properties from the data object
        let {city, state, country, zipcode} = data[facilityNumber]
        //adding facility name and location to inner text.
        document.querySelector('#name').innerText = data[facilityNumber].center
        document.querySelector('#location').innerText = `${city}, ${state}, ${country}, ${zipcode}`   
        
        //declaring variables for facility lon and lat to get weather.
        let lat = data[facilityNumber].location.latitude
        let lon = data[facilityNumber].location.longitude
        
        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${akey}&units=imperial`
        
        //fetch to get weather based on facilities location
        fetch(weatherUrl) 
        .then(res => res.json()) // parse response as JSON 
            .then(data => { 

            document.querySelector('#weather').innerText = data.main.temp
            
        }) 
        .catch(err => { 
            console.log(`error ${err}`) 
        }); 
        
        
    }) 
    .catch(err => { 
        console.log(`error ${err}`) 
    }); 
}

document.querySelector('button').addEventListener('click', findFacility)
