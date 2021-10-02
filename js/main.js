document.querySelector('button').addEventListener('click', nasaApi)
const container = document.querySelector('#container')
function nasaApi(){
  const link = `https://data.nasa.gov/resource/gvk9-iz74.json`
fetch(link)
.then((res) => res.json())
.then((data)=> {
console.log(data)

for (let i in data){
  let facilityInfo = data[i].facility
  console.log(facilityInfo)
  const section = document.createElement('section')
  section.classList.add('newSections')
  container.appendChild(section)
  const link2 = `https://api.openweathermap.org/data/2.5/weather?lat=${data[i].location.latitude}&lon=${data[i].location.longitude}&appid=a7fdf34d85817aedc68297b66cd98ba5&units=imperial`
fetch(link2)
.then((res2) => res2.json())
.then((data2) =>  {
  console.log(data2)
  section.innerText = ` The location is named ${data[i].facility}. It is located at ${data[i].location.latitude} Latitude and ${data[i].location.longitude} Longitude. The weather in farenheight is ${data2.main.temp}.`
})}})}

