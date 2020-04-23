fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(response => response.json()) // parse response as JSON (can be res.text() for plain response)
    .then(nasaLocations => {
      let zipCodes = [];
      for(const nasaLocation of nasaLocations){
        zipCodes.push(nasaLocation.zipcode);
        // maybe later:
        // getWeatherData(nasaLocation.zipcode);
      }

      for (const zipCode of zipCodes) {
        // fetch
        // Mike recommends:
        // getWeatherData(zipCode);
      }
    })
 .catch(err => {
        console.log(`error ${err}`)
        alert("sorry, there are no results for your search")
    });

getWeatherData("02169")


function getWeatherData(zipcode) {
  // you implement this (fetch)
}

for (var index = 0; index < nasaLocations.length; index = index + 1) {

}

// ----

const zipCodes = [];
for (const nasaLocation of nasaLocations) {
  zipCodes.push(nasaLocation.zipcode);
}

for (const zipCode of zipCodes) {
  fetch(`https://example?${zipCode}`).
    .then(() => {})
}
// -----

for (const nasaLocation of response) {
  fetch(`https://example?${nasaLocation.zipcode}`).
    .then(() => {})
}


fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(response => response.json()) // parse response as JSON (can be res.text() for plain response)
    .then(nasaLocations => {
      for(const nasaLocation of nasaLocations){
        getWeatherData(nasaLocation.zipcode);
      }
    })
 .catch(err => {
        console.log(`error ${err}`)
        alert("sorry, there are no results for your search")
    });
*/




//
// document.getElementById("getWeather").addEventListener("click", (e)=>{
// let city = document.getElementById("city").value
// console.log(city)
// let country = document.getElementById("country").value
// console.log(country)
//
//
//
//
// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=c3636afbd6a55832f78537a2c602777d&units=imperial`)
//     .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
//     .then(response => {
//       document.querySelector("p").textContent = response.main.temp
//       console.log(response.main.temp);
//     })
//  .catch(err => {
//         console.log(`error ${err}`)
//         alert("sorry, there are no results for your search")
//     });
// })





const addNumbers = (num1, num2) => num1 + num2;
const add4 = (otherNum) => return addNumbers(4, otherNum)
