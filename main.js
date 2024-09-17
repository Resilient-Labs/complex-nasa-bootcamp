document.querySelector("button").addEventListener("click",() => {
  fetch("https://data.nasa.gov/resource/gvk9-iz74.json") //doesn't work
  .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then(response => {
    response.forEach( (obj) => {
      const list = document.querySelector("ol")
      const sentence = document.createElement("li")
      let facility = obj.center
      let city = obj.city
      let country = obj.country
      let latitude = obj.location.latitude
      let longitude = obj.location.longitude
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=408ed3076a7c1b01ae64d051a21df0a0`)
      .then(res => res.json())
      .then(response => {

        let kelvin = response.main.temp
        let fahrenheit = Math.round((kelvin-273.15)*(9/5) + 32)
        sentence.innerHTML = `${facility} || ${city}, ${country} || ${fahrenheit}&#8457`
        // added an li element ol in the html
        list.appendChild(sentence)
      })
    })
  })
})
