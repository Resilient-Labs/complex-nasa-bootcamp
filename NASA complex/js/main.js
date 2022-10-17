// NASA complex 

document.querySelector('button').addEventListener('click', getFacility)

// get each facility and location
function getFacility() {
    fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(res => res.json())
    .then(data => {
        data.forEach( obj => console.log(obj.center + ' ' + obj.zipcode))
        let zipCode = obj.zipcode
        // put location in 2nd fetch to get weather conditions in each facility
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=58e0edbf9d3c469aa98213423221610&q=${zipCode}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.current.condition.text)
            console.log(data.current.temp_f)
            let temperature = data.current.temp_f
            let condition = data.current.condition.text
            document.querySelector('h2').innerText = `It is ${temperature} degrees F and the conditions are ${condition} at this facility.`
    })
    .catch(err => {
        console.log(`error ${err}`)
    })

    .catch(err => {
        console.log(`error ${err}`)
    })
    })
}
