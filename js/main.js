document.querySelector('#button').addEventListener('click', findLocation)

// let url = `https://data.nasa.gov/resource/gvk9-iz74.json?center=${facilityName}`


function findLocation() {
  // let facilityName = encodeURIComponent(document.querySelector('#input').value)
  let url = `https://data.nasa.gov/resource/gvk9-iz74.json`
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      const ol = document.querySelector('#ol')
      for (let i = 0; i < data.length ; i++) {
        const lng = data[i].location.longitude
        const lat = data[i].location.latitude
        let weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=6976f442527ba609d27aa3e3af5eb139`
        console.log(weather)
        fetch(weather)
          .then(res => res.json()) // parse response as JSON
          .then(weatherData => {
            console.log(weatherData.main.temp)
            const li = document.createElement('li')
            ol.appendChild(li)
            li.innerHTML = " <span class='center'> Center Name: </span> "
            li.innerHTML += data[i].center + " City:   "
            li.innerHTML += data[i].city + " " + "State:   "
            li.innerHTML +=  data[i].state + " " + "Country:   "
            li.innerHTML +=  data[i].country + " " + "latitude:   "
            li.innerHTML +=  data[i].location.latitude + " " + "longitude:   "
            li.innerHTML +=  data[i].location.longitude + " " + "Weather in Kelvin:    "
            li.innerHTML +=  weatherData.main.temp + " " + "Fahrenheit reading:    "
            li.innerHTML +=  9 / 5 * ((weatherData.main.temp) - 273) + 32


          })
      }

    })
    .catch(err => {
      console.log(`error ${err}`)
    });
  console.log(url)
}
//
// function getWeather() {
//   let lng = document.querySelector('#printHere4').innerText
//   let lat = document.querySelector('#printHere5').innerText
//   let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=6976f442527ba609d27aa3e3af5eb139`
//   console.log(url)
//     fetch(url)
//       .then(res => res.json())// parse response as JSON
//       .then(data => {
//         console.log(data)
//         document.querySelector('#weather').innerText = data.main.temp // kelvin
//         document.querySelector('#weather2').innerText = 9/5 * (((data.main.temp) - 273) + 32)
//
//       })
//
//       .catch(err => {
//         console.log(`error ${err}`)
//       });
//     console.log(url)
// }
