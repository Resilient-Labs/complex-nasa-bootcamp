//sorry bare minimum css. the java took longer than i thought. 


document.querySelector("button").addEventListener("click", getNasa);

function getNasa(){
let url = `https://data.nasa.gov/resource/gvk9-iz74.json`
fetch(url)
.then(res => res.json())
.then(nasanasa => {
  console.log(nasanasa)
  for(let i=0;i<nasanasa.length; i++) {
    let facilities = document.querySelector('.facilities')
    let location = nasanasa[i].center
    let zipCode = nasanasa[i].zipcode
    let state = nasanasa[i].state
    let country = nasanasa[i].country
let url2 = `http://api.weatherapi.com/v1/current.json?key=25cfdead640d471980621039220905&q=${zipCode}&aqi=no`
fetch(url2)
  .then(res => res.json())
  .then(nasanasa => {
  console.log(nasanasa)
  let li = document.createElement('li')
  li.innerText = `${location} is ${nasanasa.current.temp_f} degrees fahrenheight in ${state}, ${country}.`
  facilities.appendChild(li)
  })
.catch(err => {
    console.log(`error ${err}`)
});
}}
)

.catch(err => {
  console.log(`error ${err}`)
});
}