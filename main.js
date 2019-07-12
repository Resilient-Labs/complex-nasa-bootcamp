// https://data.nasa.gov/resource/gvk9-iz74.json

// Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.


document.querySelector("button").addEventListener("click",() => {
  fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
  .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then(response => {
    response.forEach( (indexObjs) => {
      const list = document.querySelector("ol")
      const sentence = document.createElement("li")
      let facility = indexObjs.center
      let city = indexObjs.city
      let country = indexObjs.country
      let latitude = indexObjs.location.latitude
      let longitude = indexObjs.location.longitude
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=408ed3076a7c1b01ae64d051a21df0a0`)
      .then(res => res.json())
      .then(response => {
        let kelvin = response.main.temp
        let fahrenheit = Math.round((kelvin-273.15)*(9/5) + 32)
        sentence.innerHTML = `${facility} || ${city}, ${country} || ${fahrenheit}&#8457`
        list.appendChild(sentence)
      })
      .catch(err => {
        console.log(`error ${err}`)
        alert("sorry, there are no results for your search")
      });
    }
  )
  })
  .catch(err => {
    console.log(`error ${err}`)
    alert("sorry, there are no results for your search")
  });
})
