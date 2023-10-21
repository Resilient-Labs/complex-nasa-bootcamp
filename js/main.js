// create 2 API queries for location of NASA's faculities and weather
// retreive facility and zip from NASA API
// retreive location and weather from weather API

document.querySelector("button").addEventListener("click", nasaFacility)
let ul = document.querySelector("ul")

function nasaFacility(){

let url = "https://data.nasa.gov/resource/gvk9-iz74.json"


fetch(url) 
    .then(res => res.json()) // parse response as JSON 
    .then(data => { 
        console.log(data) 
       
        for(let i = 0; i <= data.length; i++){
            let facility = data[i].facility
            let zip = data[i].zipcode
            console.log()
        
      
    
    let urlWeather = `http://api.weatherapi.com/v1/current.json?key=52aba881318041ffb4e04334230504&q=${zip}`

      fetch(urlWeather) 
      .then(res => res.json()) // parse response as JSON 
      .then(dataWeather => { 
        console.log(dataWeather) 
        
        let location = dataWeather.location.name
        let weather = dataWeather.current.temp_f
    
        let li = document.createElement("li")
        li.innerText = (`The facility ${facility} is located in ${location}. The current weather is ${weather} degrees (f).`)
        ul.appendChild(li)


      }) 
      .catch(err => { 
          console.log(`error ${err}`) 
      })
      
    }

    })  
    
        .catch(err => { 
        console.log(`error ${err}`) 
    });

}



