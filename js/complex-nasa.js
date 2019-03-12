let nasaUrl = `https://data.nasa.gov/api/views/gvk9-iz74/rows.json`

let button = document.getElementById('btn')
button.onclick = btnclicked
//console.log(button)

function btnclicked(event) {
  event.preventDefault()
  fetch(nasaUrl)
    .then(res => res.json())
    .then(response => {
    // console.log(response)
    // console.log(response[0].zipcode)
      var ul = document.getElementById('nasaList');
      response.data.forEach(el => {

        let latitude = el[20][1]
        let long = el[20][2]
        let stationName = el[8]
        let stationCity = el[21]
        let stationState = el[22]
        console.log(el)
        console.log(el[21])
        console.log(el[22])
        // console.log(el[8])
        // console.log("this is the lat" + el[20][1]);
        // console.log("this is long" + el[20][2]);
        let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${long}&units=imperial&appid=4809b6cbb0da2027dd6a979edc2c0c14
`

        var result = fetch(weatherApi)

          .then(function (response) {
            return response.json() // pass the data as promise to next then block
          })
          .then(function (data) {
            console.log("first wearther serach", data);
            let info = document.createElement('p');
            document.getElementsByTagName("body")[0].appendChild(info);
            info.innerHTML = info.innerHTML + "<strong>Station Name: </strong>" + stationName + ", <strong>Location: </strong>" + stationCity + " , " + stationState + " <strong> Weather:</strong> " + data.main.temp + "&#8457;"
          })
      })
    })
    .catch(err => {
      console.log(`error ${err}`)
      alert('Sorry, this does not exist')
    })
}
