const button = document.querySelector('button')
const result = document.querySelector('#result')
const apiKey = '6b341dc32f29e95e7125c376ea532cfb'

button.addEventListener('click', ()=>{

  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      //console.log(response.[index].center)

      console.log(response[0].city, response[0].state, response[0].center, response[0].facility, response[0].location.longitude, response[0].location.latitude)

      for (let i = 0; i <= response.length; i++){
        let info = response[i]
        let latitude = response[i].location.latitude
        let longitude = response[i].location.longitude
        let textNode = document.createElement('section')
        textNode.innerHTML = `${info.city}<br>${info.state}<br>${info.center}<br>${info.facility}`
        result.appendChild(textNode)

        fetch(`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`)
          .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
          .then(response => {
            //console.log(response.[index].center)
            console.log(response)
            let temp = response.currently.temperature
            console.log(temp)
            textNode.innerHTML += `<br>Current Temperature: ${temp}°F`
          })
        }

      })
      .catch(err => {
        console.log(`error ${err}`)
        //alert("Sorry, there are no results for your search.")
      })
    })
