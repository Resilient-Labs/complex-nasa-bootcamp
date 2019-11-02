const tb = document.querySelector('.locations')


fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
  .then(res => res.json())
  .then(response => {
    for (var i = 0; i < response.length; i++) {
      let spaceCenters = (`${response[i].center}   |  ${response[i].city}  |   ${response[i].facility}`)
      let lat = response[i].location.latitude
      let lon = response[i].location.longitude

      const kaniahWeatherKey = "f19a8248f194b42ede93c241d275057b"
      http://api.openweathermap.org/data/2.5/weather?city=boston&APPID=f19a8248f194b42ede93c241d275057b
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${kaniahWeatherKey}`)
        .then(res => res.json())
        .then(response => {
          const currentTemp = Math.floor(response.main.temp * 9 / 5 - 459.67)
          let textContent = document.createTextNode(currentTemp )
          let centerPlusTemp = (`${spaceCenters}  |  ${currentTemp} °F`)
          let tr = document.createElement('tr')
          tr.appendChild(document.createTextNode(centerPlusTemp))
          tb.appendChild(tr)
          console.log(response);
        })
        .catch(err => {
          console.log(`error ${err}`)
        })
        }
      })
      .catch(err =>{
        console.log(`Error ${err}`)
    })
