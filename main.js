//worked on code with House Hayden members: Kathy, Jeff, Anastasia, and Rebecca
// weather api= bb09b06e03205c6271bd3e67f01c3532
//nasa api= oGY8ttjPg0j90XE2OFF1ue3w5Ro0h77eIlgrnT3O

const button = document.querySelector('button')
const result = document.getElementById('result')
const apiKey = 'bb09b06e03205c6271bd3e67f01c3532'

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
        // let newElement = document.createElement('section')
        // console.log(`${info.city}${info.state}${info.center}${info.facility}`)
        // let textNode =document.createTextNode(`${info.city}|${info.state}|${info.center}|${info.facility}`)
        // newElement.appendChild(textNode)
        // document.getElementById('results').appendChild(newElement)

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
        //(`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`)
          .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
          .then(response => {
            console.log(response)
            let temp = response.main.temp
            console.log(temp)
            //textNode.innerHTML += `<br>Current Temperature: ${temp}°F`
            let newElement = document.createElement('section')
            console.log(`${info.city}${info.state}${info.center}${info.facility}${temp}°F`)
            let textNode =document.createTextNode(`${info.city}|${info.state}|${info.center}|${info.facility}|${temp}°F`)
            newElement.appendChild(textNode)
            document.getElementById('results').appendChild(newElement)

          })
        }

      })
      // .catch(err => {
      //   console.log(`error ${err}`)
      // })
    })
