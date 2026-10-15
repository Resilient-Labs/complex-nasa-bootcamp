
fetch(`https://cors.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`)
  .then(res=> res.json())
  .then (data => {
    console.log(data)
   let nasaData = JSON.parse(data.body)

    let facility = document.createElement('section')
    facility.innerHTML =  nasaData.map((facility, i )=> {
      //empty span to wait for the temperature value
      return `<p id = "facility-${i}"> ${facility.center} , ${facility.city} ,${facility.state} ${facility.country}  <span class="temp"> </span> </p>`
    }).join('')
          document.body.appendChild(facility)


   let getWeather = nasaData.forEach((element,i )=>{
    let lat = element.location.latitude
    let long = element.location.longitude
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m&temperature_unit=fahrenheit`)
.then(res => res.json())
.then(weather => {
//  console.log(weather)
  // if  temperature_2m exist the data will pass tot he dom if not nothing
      let temp = weather?.current?.temperature_2m ?? ''
      document.querySelector(`#facility-${i} .temp`).innerText = `${temp}°F`
})
  })
  .catch(err => {
    `error is ${err}`
  })
 


   })

  
    
      .catch(err => {
        `error is ${err}`
      })


