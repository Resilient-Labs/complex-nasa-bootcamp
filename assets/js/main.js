//Nasa Facilities Api: This dataset provides a complete public registry of NASA centers and facilities.
//It gives me: The official name of the facility, its exact geographical location (city, state, zip code, latitude, longitude).
//URL: https://data.nasa.gov/docs/legacy/gvk9-iz74.json

//Open Meteo Api: Once I retrieve the latitude and longitude coordinates from the Nasa Facilities API, I pass them into the Open Meteo Api.
//It gives me: temperature for those exact coordinates.
//URL: https://api.open-meteo.com/v1/forecast?latitude=40.7831&longitude=-73.9712&current=temperature_2m&temperature_unit=fahrenheit

const nasaUrl="assets/data/facilities.json"

fetch(nasaUrl)      
.then(res => res.json())
.then(nasa => {
    for (i=0;i<nasa.length;i++){
    console.log(nasa[i].facility)
    console.log(nasa[i].city)
    console.log(nasa[i].state)
    console.log(nasa[i].zipcode)
    console.log(nasa[i].location.latitude)
    console.log(nasa[i].location.longitude)

    const facility=nasa[i].facility
    const city=nasa[i].city
    const state=nasa[i].state
    const zipcode=nasa[i].zipcode
    const latitude=nasa[i].location.latitude
    const longitude=nasa[i].location.longitude

    const weatherUrl=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`

    fetch(weatherUrl)
    .then(res => res.json())
    .then(weather => {
        console.log(weather.current.temperature_2m)

        const temperature=weather.current.temperature_2m

        const li=document.createElement('li')

        const facilityInfo=document.createElement('p')
        facilityInfo.textContent=`${facility} - ${city}, ${state}, ${zipcode}`

        const weatherInfo=document.createElement('p')
        weatherInfo.textContent=`${temperature}°F`

        const hrLine=document.createElement('hr')

        li.appendChild(facilityInfo)
        li.appendChild(weatherInfo)
        li.appendChild(hrLine)
        
        document.querySelector('ul').appendChild(li)
    })
    .catch(err => {
        console.log(`error ${err}`)
    }) 
    } 
    })
.catch(err => {
    console.log(`error ${err}`)
})
