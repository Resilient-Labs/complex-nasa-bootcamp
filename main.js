//first apikey = 2f0298653987951209c9d7d45bca1f57





document.querySelector('.getInfo').addEventListener('click', nasaFacilities)

function nasaFacilities () {

  fetch (`https://data.nasa.gov/resource/gvk9-iz74.json`) 
    
  .then (res => res.json())
    
    .then (data => {
      
      for (let i = 0; i < data.length; i++) {
        let lat = data[i].location.latitude
        let lon = data[i].location.longitude
        let city = data[i].city
        let facility = data[i].facility
        let list = document.createElement('li')
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6a78a3bc7522a2e9a816929e6745b74b
        `)
        .then (res => res.json())
        
        .then ( data => {
          console.log(data)
          let kelvinTemp = data['main']['temp'] 
          let finalTemp = 1.8*(kelvinTemp-273) + 32

          list.innerText = `In ${facility}, ${city} it is ${finalTemp} degrees`
          document.querySelector('.nasaFacilities').appendChild(list)
          
        })
        }
        
      })
    
  }
  
