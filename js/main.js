//The user will enter a date. 
//Use that date to get the NASA picture of the day from that date! 
// https://api.nasa.gov/


    
function facilityLocations(){
  const url= `https://data.nasa.gov/resource/gvk9-iz74.json`
    fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    
   for(let i = 0; i <= 400; i++){
            const center= data[i].center
            const location= data[i].city
            const zipCode= data[i].zipcode
            console.log(location)
            let li = document.createElement('li')
            document.querySelector('h2').appendChild(li)
            li.innerText= `${center} in ${location}`
       
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${zipCode}&APPID=76cdbae952e035864405714b8200419f`
    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
        
        
    })
 







  .catch(err => {
      console.log(`error ${err}`)
    })
}
})
}
facilityLocations()