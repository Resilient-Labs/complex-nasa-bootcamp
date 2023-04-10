//create a nasa complex api with two different apiss

 //url: https://data.nasa.gov/resource/gvk9-iz74.json

 document.querySelector('button').addEventListener('click', generate)
 const container = document.querySelector('.cont')

 let Ulfacility = document.querySelector("#Facility")
 let Ullocation = document.querySelector('#location')
 let Ulweather = document.querySelector('#weather')

 function generate(){
  const url = `https://data.nasa.gov/resource/gvk9-iz74.json`
  fetch(url)
  .then(res => res.json())
  .then(data => {
  console.log(data)

    data.slice(0,5).forEach((nasa) => {
     let facilityLi= document.createElement('li')
     let locationLi= document.createElement('li')
    facilityLi.innerText = nasa.facility
    locationLi.innerText = nasa.center
    Ulfacility.append(facilityLi)
    Ullocation.append(locationLi)
     let lat = nasa.location.latitude
    let long = nasa.location.longitude
   

     getWeather(lat, long)
   })})}

 function getWeather(lat, long){
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ff81ad6ef1a6f12e36a17450739fe51d&units=Imperial`
    fetch(url)
    .then(res => res.json())
    .then(data => {
    let weatherLi= document.createElement('li')
    weatherLi.innerText= data.main.temp
    weatherLi.innerText= data.main.temp + '°F'
    Ulweather.append(weatherLi)
    console.log(data)
  


    .catch(err =>{
      console.log(`error ${err}`)
    })})}