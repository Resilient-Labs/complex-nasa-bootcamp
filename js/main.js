//Collaborators: Eric Espinoza, Nyah Macklin, Asiah Bennett, Vanessa Charles,and Joshua Wilkerson

let key =`5c601f60649e4273785048d62e6a923d`



function getWeatherByZip(nasaLocation){
    const {zipcode, center, city} = nasaLocation;

   return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${key}&units=imperial`)

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

           colorTemp(sec3,temp)

         })
        // break
      }
   })


   function colorTemp(sec,temp){
       if (temp < 32){
           sec.classList.add('cold')
           
       }else if(temp >= 32 && temp < 65) {
        sec.classList.add('cool')

       }else if(temp >= 65 && temp < 85) {
        sec.classList.add('warm')
    }else if(temp >=85) {
        sec.classList.add('hot')

    }

   }
  
////GOAL 
// if temp is below 32 --> blue
// if temp is 32-50  ---> green
// if temp is 50-70  ---> yellow
// if temp is 70+  --->red