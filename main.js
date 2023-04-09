

document.querySelector("button").addEventListener("click",orbit)


function orbit(){
  let nasaUrl = `https://data.nasa.gov/resource/gvk9-iz74.json`
  fetch(nasaUrl)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        for( let i = 0; i < data.length; i++){
          let city = data[i].zipcode
          let facility = data[i].facility
          // console.log(city,facility)
          let weatherUrl = `http://api.weatherapi.com/v1/current.json?key=5755fe8944a14ffe96e162119230504&q=${city}`


          fetch(weatherUrl)
            .then(res => res.json()) // parse response as JSON
            .then(weatherTemp => {
              // console.log(weatherTemp)
              let temp = weatherTemp.current.temp_f
              // console.log(temp)
              let location = weatherTemp.location.name
              let li = document.createElement("li")
              let ul = document.querySelector("ul")
              li.innerText = `NASA facility-${facility} is located in ${location} and the current temperature is ${temp}\u00B0`
              ul.appendChild(li)
            })
          }
      

    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

