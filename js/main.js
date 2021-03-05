// Access-Control-Allow-Origin: https://javascript.info

/********
Display weather
*********/
const key1 = config.API_KEY1
const key2 = config.API_KEY2
const urlSpace = `https://data.nasa.gov/resource/gvk9-iz74.json`
const urlWeather = `http://api.weatherapi.com/v1/current.json?key=${key2}&q=`

//Input Constants


//reponse Constants
const responseHeader = document.querySelector('#responseHeader')
const facilityDisplay = document.querySelector('#facilities')

let facilities = []

// document.querySelector('button').addEventListener('click', clicky)
clicky()

function clicky() {

  /*****
  Use in production but use dummy in testing
  *****/
  let returndata
  fetch(urlSpace)
    .then(res => res.json())
    // parse response as JSON
    .then(data => {
      console.log(data)

      data.forEach((item, i) => {
        facilities.push(new Facility(item.facility, item.center, item.location.latitude, item.location.longitude))
      });
      console.log(facilities)

      displayFacilities(facilities.length-1)
    })
    .catch(err => {
      console.log(`error ${err}`)
    });

  /******
  Dummy Data
  *******/
  // let data = fetchDummyData()





}

let displayFacilities = function(index){
  facilityDisplay.innerHTML = ''
  displayFacility(0,index)
}

/***********
Recursively display facilities with a delay to account for fetch delay
***********/
let displayFacility = function(current, end){
  let facilityName = document.createElement('h3')
  facilityName.innerText = `Facility Name: ${facilities[current].facilityName}`
  let centerName = document.createElement('h4')
  centerName.innerText = `Center Name: ${facilities[current].centerName}`
  let latitude = document.createElement('span')
  latitude.innerText = `Latitude: ${facilities[current].latitude}`
  let longitude = document.createElement('span')
  longitude.innerText = `Longitude: ${facilities[current].longitude}`
  let li = document.createElement('li')
  li.appendChild(facilityName)
  li.appendChild(centerName)
  li.appendChild(latitude)
  li.appendChild(longitude)

  fetch(urlWeather+`${facilities[current].latitude},${facilities[current].longitude}`)
    .then(res => res.json())
    // parse response as JSON
    .then(data2 => {
      console.log(data2)
      let weather = document.createElement('span')
      let degree = document.createElement('span')
      weather.innerText = `Temp: ${data2.current.temp_f} Fahrenheit`

      li.appendChild(weather)
    })
    .catch(err => {
      console.log(`error ${err}`)
    });




  facilityDisplay.appendChild(li)
  if(current<=end){
    setTimeout(displayFacility(current+1, end), 1000)
  }

}

class Facility{
  constructor (facilityName, centerName, latitude, longitude){
    this.facilityName = facilityName
    this.centerName = centerName
    this.latitude = latitude
    this.longitude = longitude
  }
}

let fetchDummyData = function(){
  return dummy
}


// let fetchDataLive = function(){
//   let returndata
//   fetch(urlSpace)
//     .then(res => res.json())
//     // parse response as JSON
//     .then(data => {
//       console.log(data)
//       //Gather all location data and fetch into
//       // let locations = data
//       // let li = document.createElement('li')
//       // document.querySelector('ul').appendChild(li)
//       returndata = data
//     })
//     .catch(err => {
//       console.log(`error ${err}`)
//     });
//   return returndata
// }



// working Book fetch
//
// fetch(urlBooks)
//         .then(res => res.json())
//         // parse response as JSON
//         .then(data2 => {
//           console.log(data2)
//         })
//         .catch(err => {
//           console.log(`error ${err}`)
//         });
