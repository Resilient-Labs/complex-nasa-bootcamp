// to do with it style, edge casing, and add text

const button = document.querySelector('button')
const result = document.querySelector('#result')
let api = '181551f7174a653c2534426e08815c4d'

button.addEventListener('click', ()=>{
fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
  .then(res => res.json())
  .then(json =>{
    console.log(json)
    // let latitude = json[i].location.latitude
    // let longitude = json[i].location.longitude

    console.log(json[0].city,json[0].state, json[0].center,json[0].facility,json[0].location.longitude,json[0].location.latitude)
    //
    for(let i = 0; i<json.length; i++){
      let el = json[i];
      let latitude = json[i].location.latitude
      let longitude = json[i].location.longitude
      let textNode = document.createElement('div')
      textNode.innerHTML = `${el.state}<br>${el.city}<br>${el.facility}<br>${el.center}`;
      result.appendChild(textNode);

        fetch(`https://api.darksky.net/forecast/${api}/${latitude},${longitude}`)
          .then(res=>res.json())
          .then(json=>{
            let temp = Math.floor(json.currently.temperature)
            textNode.innerHTML += `<br>The weather is currently ${temp}°<br>`

         })
      }
})


          .catch(err => {
              console.log(`error ${err}`)
              alert('sorry, there are no results for your search')

          });

})
