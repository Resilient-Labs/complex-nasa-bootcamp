//Collaborated with Zahmir, Finesse Joshua, Asiah, Nyah, and Vanessa
function getWeatherByZip(nasaLocation){
  //fetch WeatherAPI
  const {zipcode, center, city} = nasaLocation;
  // return fetch('http://placekitten.com/42/53')
  return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=c3636afbd6a55832f78537a2c602777d&units=imperial`)
  .then(response => response.json())
  //.then(needs => weathers) //fake request
  .then(weatherData=> ({
    temp: weatherData.main.temp,
    center,
    city,
    zipcode
  })

  )
  //.then(console.log)

}
  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
  .then(response =>response.json())

  // fetch('http://placekitten.com/42/53')
  //.then(e => nasaLoc)
  .then(nasaLocations=>{
    for(const nasaLocation of nasaLocations){
      console.log(nasaLocations);
       getWeatherByZip(nasaLocation)
       .then(tempForLocation=>{
         const { center, city, zip, temp } = tempForLocation;
         const newLi = document.createElement(`li`);
         newLi.innerHTML = `The center is: ${center} The City is: ${city} The temperature is ${temp} Farenheit`;
         newLi.style.marginBottom  = "1em"
         document.querySelector("ul").append(newLi);
       })
       // break
    }
 })


// const addNumbers = (num1, num2) => num1 + num2;
// const curryMe = otherNum => thing => addNumbers(otherNum, thing)
// const add4 = curryMe(4)
// const add56 = curryMe(56)
