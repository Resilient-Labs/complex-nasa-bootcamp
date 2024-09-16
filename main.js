document.querySelector('.button').addEventListener('click', getNasaInformation)


function getNasaInformation(){
let select = document.querySelector('select')
  let url = `https://data.nasa.gov/resource/gvk9-iz74.json`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    for(let i=0; i < select.value; i++){
      let text = document.createElement('h3')
      text.innerText= data[i].facility + ' ' + data[i].city + ' ' + data[i].state //putting sentence together of the innerText (all the infortmation wanted)
      let lat = data[i].location.latitude 
      let lon = data[i].location.longitude
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2fee941f1e309637c2ef5d84547fc756&units=imperial`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      text.innerText += ' ' + data.main.temp
      document.querySelector('.results').appendChild(text)
    })
    .catch(err => {
      console.log(`error ${err}`)
      })
    }
    })
    .catch(err => {
    console.log(`error ${err}`)
    })
}