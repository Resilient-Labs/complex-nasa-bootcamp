let button=document.querySelector('button')
// let center=document.querySelector('#centers')
let key='e7c585b428ccbab2374f86e9e8b04898'

function apiOne( ){
fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
.then(res => res.json())
.then(response =>{
  for (let i=0;i<response.length;i++){
    let info=response[i]
    let element=document.createElement('div')
    let center = document.createElement("h3")
    let state=document.createElement('h4')
    let city=document.createElement('h5')
    let facility=document.createElement('h6')
    center.textContent= info.center
    facility.textContent=info.facility
    state.textContent=info.state
     city.textContent= info.city
element.appendChild(center)
element.appendChild(state)
element.appendChild(city)
element.appendChild(facility)
    // document.body.appendChild(element);
    let latitude=info.location.latitude
   let longitude=info.location.longitude
    apiTwo(latitude,longitude,element)
  }
console.log(response)
//  for center name response[0].center
//  for llong  response[0].location.latitude
// for latit response[0].location.longitude
// for state response[0].state
// facility response[0].facility
// for country  response[0].country

})
.catch(err=>{
  console.log(err)
})
}


function apiTwo(lat,lon,element){
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${key}`)
  .then(res => res.json())
  .then(response =>{
    let info=response.list[0].main.temp
    let far=Math.floor(info* 9/5-459.67)
    let temp=document.createElement('h6')
    temp.textContent= `${far} deg Fahrenheit`
    element.appendChild(temp)
    document.body.appendChild(element)
  console.log(response)

  })
  .catch(err=>{
    console.log(err)
  })
}
button.addEventListener('click',()=>{
  apiOne()
})
