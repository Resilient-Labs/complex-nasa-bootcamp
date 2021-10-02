// Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.
// Collaborated with Samekh with helping me out with some parts of the code.

let locData = document.querySelector('#button').addEventListener('click', getLocData)
 
function getLocData(){
let url = "https://data.nasa.gov/resource/gvk9-iz74.json"

fetch(url)
    .then(res => res.json())
    .then(data => {
        Array.from(data).forEach((datas, index) => {
            locData += datas;
            let lati = data[index].location.latitude;
            let longi = data[index].location.longitude;
            let nasaCenter = data[index].center;
            let nasaCity = data[index].city;
            let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&units=imperial&appid=2054def1b491777f9f317e34fe0f9149`
        
            fetch(weatherUrl)
            .then(res => res.json())
            .then(data => {
            
            const eachTemp = data.main.temp
            let facilityInfo = `Facility Center: ${nasaCenter}. Location: ${nasaCity}. Current Weather ${eachTemp}`

            let listLocations = document.querySelector('.facInfo')
            let infoDump = document.createElement("p")
            infoDump.innerText = facilityInfo
            listLocations.appendChild(infoDump)
            })
        }) 
    })

}
