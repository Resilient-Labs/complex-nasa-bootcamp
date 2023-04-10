document.querySelector('button').addEventListener('click', getTemp)
let btn = document.querySelector('button')
let ul = document.querySelector('ul')

function getTemp(){
    ul.innerHTML = ''
    const url = "https://data.nasa.gov/resource/gvk9-iz74.json"

fetch(url)
.then(res => res.json()) // parse response as JSON
.then(dataNasa => {
    console.log(dataNasa)

for(let i = 0; i < dataNasa.length; i++){
    let zipCodeNasa = dataNasa[i].zipcode
    let facilityName = dataNasa[i].facility


const urlWeather = `http://api.weatherapi.com/v1/current.json?key=cefcb968412245d3af0191310230404&q=${zipCodeNasa}`


fetch(urlWeather) 
    .then(res => res.json()) // parse response as JSON 
    .then(dataWeather => { 
    console.log(dataWeather) 

    let facilityLocation = dataWeather.location.name
    let facilityRegion = dataWeather.location.region
    let facilityWeather = dataWeather.current.temp_f

    console.log(facilityLocation, facilityRegion, facilityWeather)
    
    let li = document.createElement('li')
    li.innerText = `The temperature at ${facilityName} in ${facilityLocation}, ${facilityRegion} is ${facilityWeather} °F.`
    // put that shit in ul in my HTML im tried please help!!!!!!!!!!
    ul.appendChild(li)

    }) 

    .catch(err => { 
        console.log(`error ${err}`) 
    });

}
}
)

.catch(err => {
console.log(`error ${err}`)
});

}

