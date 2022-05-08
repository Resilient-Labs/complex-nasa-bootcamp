
fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
.then(response => response.json())
.then(res => {
    let centerValue = res[0].center
    let facilityValue = res[0].facility
    let latValue = res[0].location.latitude
    let lonValue = res[0].location.longitude
    let stateValue = res[0].state
    let zipValue = res[0].zipcode

    let ncenter = document.querySelector('.nasaCenter')
    let nfasc = document.querySelector('.nasaFasc')
    let nlat = document.querySelector('.nasaLat')
    let nlon = document.querySelector('.nasaLon')
    let nstate = document.querySelector('.nasaState')
    let nzip = document.querySelector('.nasaZip')

    ncenter.innerHTML += centerValue
    nfasc.innerHTML += facilityValue
    nlat.innerHTML += latValue
    nlon.innerHTML += lonValue
    nstate.innerHTML += stateValue
    nzip.innerHTML += zipValue

    console.log(res)
})


const inputCity = document.querySelector('.locationValue')
const button = document.querySelector('.submitButton')

//button.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=28.538331&lon=-81.378879&appid=65d04f3a4fc69fe75d19cb930e37a85b&units=imperial')
    .then(res => res.json())
    .then(res => {
        
        const nasadiv = document.querySelector('.weatherDiv')
        const wname = document.querySelector('.wname')
        const wdesc = document.querySelector('.weather')
        const wtemp = document.querySelector('.wtemp')
        const wicon = document.querySelector('.wicon')
        
        let weatherName = res['name']
        let weatherDesc = res['weather'][0]['description']
        let weathericon = res["weather"][0]["icon"] + ".png"
        let weatherTemp = res['main']['temp']

        wname.innerHTML += weatherName
        wdesc.innerHTML += weatherDesc
        wtemp.innerHTML += weatherTemp
        wicon.innerHTML += `<img src="${weathericon}">`


        console.log(wicon)
        console.log(weathericon)
        console.log(res)
    })
    //.catch(err => alert('Please Type the comma between the city and country.'))
//})
