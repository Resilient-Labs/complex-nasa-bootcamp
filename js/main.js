
// map weather code into description
const mapWeatherCodeToText={
    0: "Clear sky.",
    1:  "Mainly clear sky.", 
    2: "Partly cloudy sky",
    3:  "Overcast sky.",
    45:  "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle" , 
    53: "Moderate drizzle.",
    55: "Dense drizzle",
    56:  "Light freezing drizzle" ,
    57:  "Dense freezing drizzle" ,  
    61: "Slight rain.",
    63:  "Moderate rain.",
    65: "Heavy rain." , 
    66: "Light freezing rain",
    67: "Heavy freezing rain" , 
    71:  "Slight snow fall",
    73:  "Moderate snow fall",
    75: "Heavy snow fall.",
    77: "Snow grains falling.", 
    80: "Slight rain showers.",
    81: "Moderate rain showers.",
    82: "Violent rain showers.",
    85:  "Slight snow showers",
    86:  "Heavy snow showers.",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
} 


const inputVal = document.querySelector("#search-facility")
const facilityContainer = document.querySelector(".facility-container")

// function to load every 400 facility when page loads

function getFacilities(){
    fetch("./data/nasa-facilities.json")
    .then(res=>res.json())
    .then((data)=>{

      const onlyFourHundred = data.slice(0,400)

        createCardForFacilites(onlyFourHundred)


    //       // listener for change on input for searching facilitiy based on name/center
    //   inputVal.addEventListener("input",(event)=>{

    //      // // get the value from the input 
    //   const searchInput = event.target.value.toLowerCase()
    // const filteredCenter =  onlyFourHundred.filter((facilityCenter)=>{
    //   return facilityCenter.center.toLowerCase().includes(searchInput)

     
    // })

    // console.log(filteredCenter)
    

    // })
  
    })
}

getFacilities()

// funnction to create the card for each facilities
 function createCardForFacilites(data){
  // i just need 400 of them 
        const onlyFourHundred = data.slice(0,400)
      
      for(let i=0;i<onlyFourHundred.length;i++){


        // create a card for each facilities
        const cards = document.createElement("div")
        cards.classList.add("facility")
        
       
        const center = document.createElement("h1")
        center.textContent = onlyFourHundred[i].center

         
        const stateCity = document.createElement("p")
        stateCity.textContent = `${onlyFourHundred[i].center} , ${onlyFourHundred[i].state}`

        
      

        // append each to the card
        cards.append(center,stateCity)
      

        // attach this to the parent/D0M
        facilityContainer.appendChild(cards)

        //event listener for triggering the  displayweather function
        cards.addEventListener("click",()=>{
           getWeather(onlyFourHundred[i].test.lat,onlyFourHundred[i].test.lon)
           .then((currentData)=>displayWeather(onlyFourHundred[i],currentData))
        })

      }
    }

// function to get the weather
function getWeather(latitude,longitude){
   
 const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,apparent_temperature,relative_humidity_2m,weather_code`
   
  return fetch(url)
    .then(res=>res.json())
    .then((data)=>{
      console.log(data)
    return data.current
    })
}

 
// display the information to the weather card
function displayWeather(facility,current){
document.querySelector("#center").textContent = facility.center
document.querySelector("#stateCity").textContent = `${facility.city} , ${facility.state}`
document.querySelector("#lat-lon").textContent = `${facility.test.lat.toFixed(1)}° , ${facility.test.lon.toFixed(1)}°`

// comvert  temp to faharenhiet
const tempInFahranehit = Number((current.temperature_2m * 1.8)+32).toFixed(1)
document.querySelector("#temp").textContent = `${tempInFahranehit}F`

// mapping each weathercode into specifc weather description
console.log(document.querySelector("#cloud-desc").textContent = mapWeatherCodeToText[current.weather_code])

const feelsLikeInTemp = Number((current.apparent_temperature * 1.8)+32).toFixed(1)
document.querySelector("#feel-like-value").textContent =` ${feelsLikeInTemp}`

//convert the km/h->miles per hour
const windInHour = Number(current.wind_speed_10m * 0.62).toFixed(1)
document.querySelector("#wind-value").textContent = `Wind:${windInHour} mph`

document.querySelector("#humidity-value").textContent = `${current.relative_humidity_2m}%`
}

  // // listener for change on input for searching facilitiy based on name/center
  //   searchInput.addEventListener("change",(event)=>{
  //     console.log(event.target.value)
  //   })