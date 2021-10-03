// Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.

 

function getNASALocation(){
  
  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
  .then(res => res.json())
  .then(data=>{
   
    console.log(data)
 
    data.forEach(item => {
        let latitude = item.location.latitude
        let longitude = item.location.longitude
      
      const weatherUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c4cab5506a3bc2466779e827dc0ccf34&units=imperial`

        fetch(weatherUrl)
        
        .then(res => res.json())
        .then(data => {
            let locations = item.facility
            let table = document.getElementById('cityList')
            let next = table.insertRow()
            let newCell = next.insertCell()
            let newFacility = document.createTextNode(`${locations} | Temperature: ${data.main.temp} °F`)
            newCell.appendChild(newFacility)
        })  
        })
    })
}

//Event Listner

document.querySelector('button').addEventListener('click', getNASALocation, {once: true})
