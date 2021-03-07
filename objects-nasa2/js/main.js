


  const url = `https://data.nasa.gov/resource/gvk9-iz74.json`

  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
  console.log(data)
  for(let i = 0; i < 3; i++){

    let listCenter = document.createElement('li')
    let listFacility = document.createElement('ul')
    let listCity = document.createElement('li')
    let listCountry = document.createElement('li')
    let listLat = document.createElement('li')
    let listLng = document.createElement('li')
    let list = document.querySelector('#list')

    listCenter.innerText += data[i].center
    listFacility.innerText += data[i].facility
    listCity.innerText += data[i].city
    listCountry.innerText += data[i].country
    listLat.innerText += data[i].location.latitude
    listLng.innerText += data[i].location.longitude

    list.appendChild(listCenter)
    listCenter.appendChild(listFacility)
    listFacility.appendChild(listCity)
    listFacility.appendChild(listCountry)
    listFacility.appendChild(listLat)
    listFacility.appendChild(listLng)


  let latVal = listLat.innerText
  let lngVal = listLng.innerText

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latVal}&lon=${lngVal}&appid=e7ff6929e4ab21d46c04682153d536e7`

    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
    console.log(data)
    let listWeather = document.createElement('li')
    let result = 1.8 * (data.main.temp - 273) +32
    // F = 1.8(K - 273) + 32
    listWeather.innerText = result
    listFacility.appendChild(listWeather)
    })


}
  // document.querySelector('.facility').innerText = data[0].facility

  })
  .catch(err => {
    console.log(`error ${err}`)
  });









// document.querySelector('.centerBtn').addEventListener('click', getLocation)
//
// function getLocation(){
//   let nasaCenter = document.querySelector('input').value
//
//   const url = `http://data.nasa.gov/resource/gvk9-iz74.json?center=${nasaCenter}`
//
//   fetch(url)
//   .then(res => res.json()) // parse response as JSON
//   .then(data => {
//   console.log(data)
//   // for(let i = 0; i <= array.length; i++)
//   document.querySelector('.center').innerText = data[0].center
//   document.querySelector('.facility').innerText = data[0].facility
//   document.querySelector('.city').innerText = data[0].city
//   document.querySelector('.country').innerText = data[0].country
//   document.querySelector('.lat').innerText = data[0].location.latitude
//   document.querySelector('.lng').innerText = data[0].location.longitude
//
//
//
//
//
//     let latVal = document.querySelector('.lat').innerText
//     let lngVal = document.querySelector('.lng').innerText
//
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latVal}&lon=${lngVal}&appid=e7ff6929e4ab21d46c04682153d536e7`
//
//     fetch(url)
//     .then(res => res.json()) // parse response as JSON
//     .then(data => {
//     console.log(data)
//     let result = 1.8 * (data.main.temp - 273) +32
//     // F = 1.8(K - 273) + 32
//     document.querySelector('.weather').innerText = result
//
//     })
//     .catch(err => {
//       console.log(`error ${err}`)
//     });
//
//
//
//   })
//
// }
//
// document.querySelector('.weatherBtn').addEventListener('click', getWeather)
//
// function getWeather(){
//
//   let latVal = document.querySelector('.lat').innerText
//   let lngVal = document.querySelector('.lng').innerText
//
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latVal}&lon=${lngVal}&appid=e7ff6929e4ab21d46c04682153d536e7`
//
//   fetch(url)
//   .then(res => res.json()) // parse response as JSON
//   .then(data => {
//   console.log(data)
//   let result = 1.8 * (data.main.temp - 273) +32
//   // F = 1.8(K - 273) + 32
//   document.querySelector('.weather').innerText = result
//
//   })
//   .catch(err => {
//     console.log(`error ${err}`)
//   });
// }


// document.querySelector('.centerBtn').addEventListener('click', getLocation)
//
// function getLocation(){
//   let nasaCenter = document.querySelector('input').value
//
//   const url = `http://data.nasa.gov/resource/gvk9-iz74.json?center=${nasaCenter}`
//
//   fetch(url)
//   .then(res => res.json()) // parse response as JSON
//   .then(data => {
//   console.log(data)
//   // for(let i = 0; i <= array.length; i++)
//   document.querySelector('.center').innerText = data[0].center
//   document.querySelector('.facility').innerText = data[0].facility
//   document.querySelector('.city').innerText = data[0].city
//   document.querySelector('.country').innerText = data[0].country
//   document.querySelector('.lat').innerText = data[0].location.latitude
//   document.querySelector('.lng').innerText = data[0].location.longitude
//
//
//   })
//   .catch(err => {
//     console.log(`error ${err}`)
//   });
// }
//
// document.querySelector('.weatherBtn').addEventListener('click', getWeather)
//
// function getWeather(){
//
//   let latVal = document.querySelector('.lat').innerText
//   let lngVal = document.querySelector('.lng').innerText
//
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latVal}&lon=${lngVal}&appid=e7ff6929e4ab21d46c04682153d536e7`
//
//   fetch(url)
//   .then(res => res.json()) // parse response as JSON
//   .then(data => {
//   console.log(data)
//   let result = 1.8 * (data.main.temp - 273) +32
//   // F = 1.8(K - 273) + 32
//   document.querySelector('.weather').innerText = result
//
//   })
//   .catch(err => {
//     console.log(`error ${err}`)
//   });
// }
