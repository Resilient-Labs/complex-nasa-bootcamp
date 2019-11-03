const button = document.querySelector('button')
const result = document.querySelector('#result')


button.addEventListener("click", ()=>{
  // city = document.querySelector('#city')
  // country = document.querySelector('#country')
  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {

      for(let i = 0; i <= response.length; i++){
        let lat = response[i].location.latitude
        let lon = response[i].location.longitude
        let info = response[i]
        let textNode = document.createElement('section')
        textNode.innerHTML = `${info.city}<br>${info.state}<br>${info.center}<br>${info.facility}`
        result.appendChild(textNode)

      const key = "83c180cda9c7dbed5e8d603bfa794bca"

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${key}`)
        .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
        .then(response => {
          console.log(response)
          let temp = (response.main.temp*9/5-459.67)
          textNode.innerHTML += `<br>${temp}`
        })
      }
    })

    .catch(err => {
        console.log(`error ${err}`)
        alert("sorry, there are no results for your search")
    });
})
