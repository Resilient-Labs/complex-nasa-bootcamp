const apiKey = 'e25000cb8528684944d6a948d9ac0519'
const btn= document.querySelector('button')
const result = document.querySelector('#result')




btn.addEventListener('click',() =>{


  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
  .then(res => res.json())


  .then(response =>{

    for(let i=0; i<response.length; i++){
    let el = response[i]
    let weather= response[i].location.longitude
    let weatherOther = response[i].location.latitude
    const lat = document.createTextNode(response.latitude)
    const long =document.createTextNode(response.longitude)
    let creation= document.createElement('div')
    creation.appendChild(long)
    creation.appendChild(lat)
    creation.innerHTML= `Facility:${el.facility}<br>Center:${el.center}<br>City:${el.city}<br>State:${el.state}`
    result.appendChild(creation);

fetch(`https://api.darksky.net/forecast/${apiKey}/${weatherOther},${weather}`)
  .then(res => res.json())


  .then(response =>{

    const temp = response.currently.temperature
    creation.innerHTML += `<br> The current temperature is: ${temp}`

  })
}

  })

  .catch(err =>{
  console.log(`${err} error`)
  })

})
