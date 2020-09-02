// https://data.nasa.gov/resource/gvk9-iz74.json
// weather key 1faef65356594f0917efa657c9cd77f7
// httpsapi.openweathermap.org/data/2.5/weather?zip=${zipValue}&appid=1faef65356594f0917efa657c9cd77f7
let button = document.querySelector('.submit')
let form = document.querySelector('.form')
let input = document.querySelector('.input')
let facility = document.getElementById('facility')
const apiCall = () =>{
  let userAnswer = input.value
  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json?`)
  .then( res => res.json())
  .then(data => {
    console.log(data)
    let nameValue = data.facility;
    let zipValue = data.zipcode;
    let cityValue = data.city;
    console.log(nameValue)
    console.log(zipValue)
    console.log(cityValue)
  fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${userAnswer}&appid=1faef65356594f0917efa657c9cd77f7&units=imperial`)
    .then( res => res.json())
    .then(data => {
      let tempValue = data.main.temp;
      console.log(tempValue)
      facility.innerHMTL = `Name: ${nameValue} City: ${cityValue} Weather: ${tempValue}`
    })
  })
}
button.addEventListener('click', apiCall);
form.addEventListener("submit", (event) => {
  event.preventDefault()
})