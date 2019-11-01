// Goal: Use NASA's API to return all of their facility locations (~400).
// Display name facility,
//location
//weather at the facility currently.

const btn = document.querySelector("#buttonForLocations")
const apiKey = "bb7840518c3dd59e9338c78c5449e955"
let ul = document.querySelector("#weatherList")
let ulTempList = document.querySelector("#tempList")




btn.addEventListener('click', ()=>{
  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
      .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
      .then(response => {

        for (let i = 0; i < response.length; i++){
          let facilityNameNode = document.createTextNode(response[i].center+" -- "+response[i].facility+" -- "+response[i].city+", "+response[i].state)
          let latiTude = (response[i].location.latitude);
          let longiTude = (response[i].location.longitude)
          console.log(latiTude + longiTude)
          let li = document.createElement('li')
          li.appendChild(facilityNameNode)
          ul.appendChild(li)
          // fetching for temp vie cordinates
          fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latiTude}&lon=${longiTude}&APPID=${apiKey}`)
              .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
              .then(response => {
                let far = Math.floor(response.main.temp * 9/5-459.67)
                let tempTextnode = document.createTextNode(far)
                let li = document.createElement('li')
                li.append(tempTextnode, " Ferinheight")
                ulTempList.appendChild(li)
              })

        }
      })
      .catch(err => {
          console.log(`error ${err}`)
          alert("sorry, there are no results for your search")
      });

})
