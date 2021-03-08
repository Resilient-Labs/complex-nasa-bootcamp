/* 2 api pseudocode
API NASA: https://data.nasa.gov/resource/gvk9-iz74.json

need api for weather of the nasa location

https://api.openweathermap.org/nasaData/2.5/weather?q=${city},${state},${country},&units=imperial&appid=b4a8249fdb18e85af658ae914f292e78

user will input state
*/

//Mark helped//

//House Moses!!!!//

const url1 = `https://data.nasa.gov/resource/gvk9-iz74.json`
fetch(url1)
  .then(res => res.json())
  .then(nasaData => {
    console.log(nasaData)
    //replace 3 for nasaData.length for testing//
    for (let i = 0; i < nasaData.length; i++) {
      // the "let" inside the head of the for loop, creates a diff i for every iteration of the loop//
      let newZip = nasaData[i].zipcode.slice(0, 5)
      const center = nasaData[i].center
      const facility = nasaData[i].facility
      const row = document.createElement('tr')
      console.log(nasaData[i].center)
      const centerCell = document.createElement('td')
      const facilityCell = document.createElement('td') //creating each cell of the row(tr)//
      const locationCell = document.createElement('td')
      const weatherCell = document.createElement('td')
      const weatherButton = document.createElement('button')
      document.querySelector('tbody').appendChild(row) // row is a variable representing the tr which is the child of tbody//
      row.appendChild(centerCell)
      //row is already made from line 18, since its not made in the HTML, we can just use dot notation. Analogy:  "row, is like out subject of the sentence","appendChild is like the verb" and "faciltyCell would like like the object"//
      centerCell.innerHTML = center
      // ^connecting cell created on line 19 to the nasaData from line 16//
      row.appendChild(facilityCell)
      facilityCell.innerHTML = facility
      row.appendChild(locationCell)
      locationCell.innerHTML = newZip
      row.appendChild(weatherCell)
      weatherCell.appendChild(weatherButton)

      ///Math.round() rounds the value of the integer to the nearest number
      console.log(facility, row)
      weatherButton.innerHTML = "Click Here for Weather"
      weatherButton.addEventListener("click", showWeather) //every time we go thru the loop, the showWeather fun is diff, since new zip is diff,//
      //this allows each button to have their own eventListener//
      //if we used document.querySelector like before, only the first button would be clckable and all items would show, since the comp doesnt have a second clickable button, just an empty one. The first button would end up running more than 1 function. //
      function showWeather() {
        const url2 = `http://api.openweathermap.org/data/2.5/weather?zip=${newZip},us&appid=b4a8249fdb18e85af658ae914f292e78`
        console.log(url2)
        fetch(url2) //DO NOT INTERUPT fetch and .then, they need to be next to each other for it to work
          .then(res => res.json())
          .then(weatherData => {
            let weather = weatherData.weather[0].description
            let temperature = weatherData.main.temp
            let celsius = temperature - 273.15

            weatherCell.innerHTML = Math.round(celsius) + "°C " + weather

            console.log(weatherData)
          })
      }

    }


  })
  .catch(err => {
    console.error(`error ${err}`)
  })
