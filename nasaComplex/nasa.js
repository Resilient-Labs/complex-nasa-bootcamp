
const rResults = document.querySelector("#returnResults")
const allResults = document.querySelector("#allResults")
const openWeatherApi = "16aad37fe9d6d5780bf7430934365bcf"

var key_31nc = config.KEY_31nc

rResults.addEventListener('click', function(){
  fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
      .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
      .then(response => {
        console.log(response)



        //grab center, state, country, & location which has latitude and longitude
        for(let i = 0; i < response.length; i++){
          //console.log(i)

            let newSection = document.createElement('section')
            //console.log(newSection)
            //what to grab from the i
            let name = response[i].center
            let country = response[i].country
            let state = response[i].state
            let city = response[i].city
            let latitude = response[i].location.latitude
            let longitude = response[i].location.longitude
            newSection.innerHTML = `${name} ${country} ${state} ${city} `
            // console.log(name)
            allResults.appendChild(newSection)

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${key_31nc}`)
                .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
                .then(response => {
                  console.log(response)

                  // coordinates = response['coord']

                  let temperature = Math.floor((((response.main.temp-273.15)*9)/5)+32)
                  // console.log(temperature)

                   //let coordinates = response.response['coord']
                   // console.log(coordinates)
                   // console.log(coordinates.lat)
                   newSection.innerHTML += ` ${temperature}`

                  })

        }


      })


      .catch(err => {
          console.log(`error ${err}`)
          alert("sorry, there are no results for your search")
      });

})
