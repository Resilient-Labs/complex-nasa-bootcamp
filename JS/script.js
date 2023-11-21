//Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently. 

//Create an event listener that will take user input (location)
document.querySelector('button').addEventListener('click', getLocationInfo)

//Create a function for the event listener that nests a fetch (weather) inside a fetch (nasa)
    //basic fetch boilerplate for nasa url
        //loop through all elements in array. Grab required elements to fulfill params in 2nd fetch url (long, lati, facility name)
function getLocationInfo(){
    const nasaUrl=`https://data.nasa.gov/resource/gvk9-iz74.json` 
    fetch(nasaUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            let lat = data[i].location.latitude
            let lon = data[i].location.longitude
            let facilityName = data[i].center
            let specificFacility = data[i].facility
            let state = data[i].state
            let zipcode = data[i].zipcode
            // console.log(data[i].location.latitude)
            // (console.log(data[i].center))
            // console.log(data[i].location.longitude)
        //Now you've successfully grabbed required elements, they can be passed into the weather api's URL (take lat & lon and make T.L.${})
        const weatherUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=49d857e1587c09325d9d247af6430755`
        fetch(weatherUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data) 
            //Console log worked since it's returning temps at specific lati & long
                //Access temp in current array. Convert K to F (data.main.temp = val for K). Get formula for conversion. parseInt takes whole numbers from value.
            //Now all values are grabbed, it needs to be displayed on DOM. Do append child method.
            let fahrenheit = parseInt((data.main.temp - 273.15) * 1.8 + 32)
            let li = document.createElement('li')
                document.querySelector('h2').appendChild(li)
                li.innerText = `Facility: ${facilityName}, ${specificFacility} (${state}, ${zipcode}). The current temperature is ${fahrenheit}°F`
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

// Resources

//documentation https://data.nasa.gov/Management-Operations/NASA-Facilities/scmi-np9r
//nasa url: https://data.nasa.gov/resource/gvk9-iz74.json // no key is needed?
//weather api url:  https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}