//The user will enter a date. 
//Use that date to get the NASA picture of the day from that date! 
// https://api.nasa.gov/


    
function facilityLocations(){
  const url= `https://data.nasa.gov/resource/gvk9-iz74.json`
  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
   // console.log(data)
    
   for(let i = 0; i <= 485; i++){
            const center = data[i].center
            const facility = data[i].facility
            const location = data[i].city
            const lat = data[i].location.latitude
            const long = data[i].location.longitude
    
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=76cdbae952e035864405714b8200419f`
      fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
      //console.log(data.main.temp)
      let convert = Math.floor((data.main.temp - 273.15) * 1.8 + 32) 
      let li = document.createElement('li')
      document.querySelector('h2').appendChild(li)
      li.innerText= `${facility} at ${center} in ${location} and it is ${convert}℉`
           
    })


  .catch(err => {
      console.log(`error ${err}`)
    })
}
})
}
facilityLocations()