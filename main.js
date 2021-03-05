document.querySelector("button").addEventListener("click",() => {
    fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
    .then(res => res.json()) 
    .then(response => {
      response.forEach( (data) => {
        const list = document.querySelector("ol")
        const sentence = document.createElement("li")
        let center = data.center
        let city = data.city
        let country = data.country
        let long = data.location.longitude
        let lat = data.location.latitude
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=014631d2c96c603952b85db3d997e201`)
        .then(res => res.json())
        .then(response => {
          let kelvin = response.main.temp
          // convert tempearture to kelvin to fahrenheit
          let fahrenheit = Math.round((kelvin-273.15)*(9/5) + 32)
          sentence.innerHTML = `${center} || ${city}, ${country} || ${fahrenheit}&#8457`
          // write in html the facility  etc 
          // this adds li to ol 
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