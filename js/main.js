//Collaborators: Eric, Nyah, asiah, 

//let key =``



function getWeatherByZip(nasaLocation){
    const {zipcode, center, city} = nasaLocation;

    return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=c3636afbd6a55832f78537a2c602777d&units=imperial`)

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
  



////GOAL
// if temp is below 32 --> blue
// if temp is 32-50  ---> green
// if temp is 50-70  ---> yellow
// if temp is 70+  --->red