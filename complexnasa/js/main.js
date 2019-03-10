let url = `https://data.nasa.gov/resource/9g7e-hzz.json`

let nasaCity = []
let nasaName = []
let nasaZipcode = []

let button = document.getElementById("button1")
console.log(button)
button.onclick = buttonclicked

function btnclicked(event) {
  event.preventDefault()
  fetch(url)
    .then(res => res.json())
    .then(response => {
      // console.log(response)
      // console.log(response[0].zipcode)

      var ul = document.getElementById("list");

      response.forEach(el => {
        console.log(el);
        let long = el.location.coordinates[0]
        let lat = el.location.coordinates[1]
        let weatherapi = `https://api.weather.gov89/points/${lat},${long}`
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
      alert('sorry, what you where looking for cant be fund')
    })
}
