
document.querySelector('button').addEventListener('click',getInfo)

const url1 = `https://data.nasa.gov/resource/gvk9-iz74.json`

//  document.querySelector(".temp").innerText = data.main.temp

function getInfo(){
  let name = document.querySelector(".name")
  let facility = document.querySelector('.facility')
  let zip = document.querySelector('.zipcode')
  let state = document.querySelector('.state')
  let country = document.querySelector('.country')
  let longitude= document.querySelector("#longitude")
  let latitude= document.querySelector("#latitude")
  let temp = document.querySelector('temp')

fetch(url1)
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      const limitedData = data.slice(0,400)
    data.forEach(nasa => {
      let name1 = document.createElement('li')
      let facility1 = document.createElement('li')
      let zip1 = document.createElement('li')
      let state1 = document.createElement('li')
      let country1 = document.createElement('li')
      let long1 = document.createElement('li')
      let lat1 = document.createElement('li')
      

      // console.log('.name1')

      name1.innerText = nasa.center
      facility1.innerText = nasa.facility
      zip1.innerText = nasa.zipcode
      state1.innerText = nasa.state
      country1.innerText = nasa.country
      long1.innerText = nasa.location.longitude
      lat1.innerText = nasa.location.latitude

      name.append(name1)
      facility.append(facility1)
      zip.append(zip1)
      state.append(state1)
      country.append(country1)
      longitude.append(long1)
      latitude.append(lat1)
      
      
      let lon = nasa.location.longitude
      let lat = nasa.location.latitude

      const url2 = `https://api.openweathermap.org/data/2.5/weather?&APPID=b0c8db590e3443b4265a5c0a41f24628&units=imperial&lat=${lat}&lon=${lon}`

    fetch(url2)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      data.forEach(weather => {
      let temp1 = document.createElement('li')
      document.querySelector(".temp").innerText = weather.main.temp
      document.querySelector('ul').appendChild(temp1)
      console.log(weather.main.temp)
      temp.append(temp1)
      
      
     });{
      // document.querySelector(".name").innerText = data[0].center
      // document.querySelector(".zipcode").innerText = data[0].zipcode
      // document.querySelector(".state").innerText = data[0].state
      // document.querySelector(".country").innerText = data[0].country
      // document.querySelector("#longitude").innerText = data[0].location.longitude
      // document.querySelector("#latitude").innerText = data[0].location.latitude
      }
    })
     })
    
    .catch(err => {
        console.log(`error ${err}`)
    });
})
}