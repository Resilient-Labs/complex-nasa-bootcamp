document.querySelector('#get').addEventListener('click', getList)

function getList(){
fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      for(let i = 0; i < data.length; i++){
      let add = document.createElement('tr')
      add.innerHTML = `<td>${data[i].facility}</td><td>${data[i].city}</td><td>${data[i].state}</td>`
      document.querySelector('table').appendChild(add)

      let lat = data[i].location.latitude
      let lon = data[i].location.longitude

      const url = (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7d5cbe693362dd5f1d98eb3d6e7640e9`)
      fetch(url)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
            let tFar = (Math.floor((data.main.temp - 273.15) * 9/5 + 32) + '℉')
            add.innerHTML += `<td>${tFar}</td>`
          })
          .catch(err => {
              console.log(`error ${err}`)
          });
      }
    })
}