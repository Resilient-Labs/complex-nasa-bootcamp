

let url = "https://data.nasa.gov/docs/legacy/NASA_Facilities/NASA_Facilities_rows.json"

fetch(url)
.then(res => res.json())
.then(data =>{
    
console.log(data.data[0])

data.data.forEach(facility =>{ 
let facilityName = facility[8]
let city = facility[21]
let state = facility[22]
let lat = facility[20][1]
let lon = facility[20][2]
        //let city = facility[21]
    
//getInfo(lat,lon,facilityName,city,state)    
let container = document.getElementById('container-info')
let facilityContainer = document.createElement('section')    
let p = document.createElement('p') 
p.innerText= `${facilityName}: ${city}, ${state}`
let weatherBtn = document.createElement('button') 
weatherBtn.innerText = "Get Weather"
weatherBtn.addEventListener('click',()=>{
    getWeather(lat,lon,facilityContainer)

})
facilityContainer.appendChild(p)
facilityContainer.appendChild(weatherBtn)
container.appendChild(facilityContainer)

})
})
.catch(err=>console.log(err))



function getWeather(lat,lon,facilityContainer){
let key = "f188e65b01de8e2535dbcf6829e0ab81"
let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
fetch(url)
.then(res =>res.json())
.then(data =>{
console.log(data)
let temp = data.main.temp
let description = data.weather[0].description
let weather = document.createElement('p')
weather.innerText = `Current temperature is ${temp} degrees farenheit with ${description}.` 
facilityContainer.appendChild(weather)
})
}


