//Collaborators: Eric Espinoza, Nyah Macklin, Asiah Bennett, Vanessa Charles,and Joshua Wilkerson
//

function getWeatherByZip(nasaLocation){
    const {zipcode, center, city} = nasaLocation;

   return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=e71acf2c8f36d9b1df7f78ba278857d3&units=imperial`)

    .then(response => response.json())
    .then(weatherData=> ({
      temp: weatherData.main.temp,
      center,
      city,
      zipcode
    })

    )
  }
    fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(response =>response.json())
    .then(nasaLocations=>{
      for(const nasaLocation of nasaLocations){
        console.log(nasaLocations)
         getWeatherByZip(nasaLocation)
         .then(tempForLocation=>{
           const { center, city, zip, temp } = tempForLocation

           let sec1 = document.createElement(`section`)
           let sec2 = document.createElement(`section`)
           let sec3 = document.createElement(`section`)

           sec1.textContent = center
           sec2.textContent = city
           sec3.textContent = temp

           sec1.classList.add(`facility`)
           sec2.classList.add(`facility`)
           sec3.classList.add(`facility`)

           document.querySelector(".data").appendChild(sec1)
           document.querySelector(".data").appendChild(sec2)
           document.querySelector(".data").appendChild(sec3)


         })
        // break
      }
   })
