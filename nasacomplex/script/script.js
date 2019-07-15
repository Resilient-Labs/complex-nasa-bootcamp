// get facility name, location, and the current weather
//found data.nasa.gov api for the locations
document.querySelector("button").addEventListener("click",() => {
  fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
  .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then(response => {
    response.forEach( (obj) => {
      // response returns an array, forEach allows us to dig through it
      const list = document.querySelector("ol")
      const sentence = document.createElement("li")
      let facility = obj.center
      let city = obj.city
      let country = obj.country
      let latitude = obj.location.latitude
      let longitude = obj.location.longitude
      // through first fetch() we found latitude and longitude to use in second fetch() query.
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=408ed3076a7c1b01ae64d051a21df0a0`)
      .then(res => res.json())
      .then(response => {
        
        let kelvin = response.main.temp
        // convert kelvin to fahrenheit
        let fahrenheit = Math.round((kelvin-273.15)*(9/5) + 32)
        sentence.innerHTML = `${facility} || ${city}, ${country} || ${fahrenheit}&#8457`
        // added 'li' to the 'ol'
        list.appendChild(sentence)
      })
      .catch(err => {
        console.log(`error ${err}`)
        // alert("sorry, there are no results for your search")
      });
    }
  )
  })
  .catch(err => {
    console.log(`error ${err}`)
    // alert("sorry, there are no results for your search")
  });
})
