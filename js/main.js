document.querySelector('button').addEventListener('click', getLocation)
const btn = document.querySelector('button')
const ul = document.querySelector('ul')
// require('dotenv').config()

// require('dotenv').config({ path: require('find-config')('.env') })

// console.log(process.env)

// require('dotenv').config()
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()

// console.log(process.env)

function getLocation() {
  const url = (`https://data.nasa.gov/resource/gvk9-iz74.json`)
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      // console.dir(data)

      for (let i = 0; i < 485; i++) {
        let center = data[i].center
        let city = data[i].city
        let facility = data[i].facility

        let lat = data[i].location.latitude
        let lon = data[i].location.longitude
        const key = '488a0f4271c04fb9a1221953230604'
      
        const temp =`http://api.weatherapi.com/v1/current.json?q=${lon},${lat}&key=${key}`

        fetch(temp)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
            let fahrenheit = data.current.temp_f
            // console.log(lon)
            let li = document.createElement('li')
            ul.appendChild(li).innerText =
              `The ${center} is located in ${city} at this ${facility} where the temperature is currently ${fahrenheit} °F.`

            console.log(facilities)

          })

          .catch(err => {
            console.log(`error ${err}`)
          });
      }
    })
}

// this work was collectively made among various peers: Jessica, Akeem, Ten, Taquan

