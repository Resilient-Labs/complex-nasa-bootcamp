// return fetch(`https://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a1` + rocketId); // make a 2nd request and return a promise
// `https://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a1`

// make the call to an api

let nasaUrl = `https://data.nasa.gov/resource/9g7e-7hzz.json`

let nasaCity = []
let nasaFac = []
let nasaZip = []

let button = document.getElementById('btn')
console.log(button)
button.onclick = btnclicked

function btnclicked(event) {
  event.preventDefault()
  fetch(nasaUrl)
    .then(res => res.json())
    .then(response => {
      // console.log(response)
      // console.log(response[0].zipcode)

      var ul = document.getElementById('nasaList');

      response.forEach(el => {
        console.log(el);
        let long = el.location.coordinates[0]
        let lat = el.location.coordinates[1]
        let weatherapi = `https://api.weather.gov/points/${lat},${long}`
        console.log(weatherapi)
        var result = fetch(weatherapi)

          .then(function (response) {
            return response.json() // pass the data as promise to next then block
          })
          .then(function (data) {
            console.log("first wearther serach", data);
            let weatherapi2 = data.properties.forecast;
            console.log("second Url", data);
            let result2 = fetch(weatherapi2)


              .then(function (response) {
                return response.json() // pass the data as promise to next then block
              })
              .then(function (data) {
                console.log("second weather", data);
                let li = document.createElement('li');
                ul.appendChild(li);
                li.innerHTML = li.innerHTML + el.center + " " + el.city + " " + el.zipcode;

              })
            })
    })
    })
    .catch(err => {
      console.log(`error ${err}`)
      alert('sorry, there are no results for your search')
    })
}