document.querySelector('button').addEventListener('click', getTemp())

function getTemp(){
  let url = `https://data.nasa.gov/resource/gvk9-iz74.json`

    fetch(url)
    .then(res => res.json())
    .then(data => {
    // console.log(data)
    const facility = document.querySelector('ul')

    for(i=0; i < data.length; i++) {
      let li = document.createElement('li');
      li.innerText= `Facility: ${data[i].facility} | Location: ${data[i].location.latitude} ${data[i].location.longitude} | Weather: `
      facility.appendChild(li);

      let lat = data[i].location.latitude
      let long = data[i].location.longitude
      // console.log(data[i])
    
    

    let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6d7ac0a3f6c57425cd4f58fff9a5b1eb&units=imperial`
      // console.log(url2)

      fetch(url2)
      .then(res => res.json())
      .then(data2 => {
        console.log(data2)

        li.innerText += ` ${data2.weather[0].description} Temperature: ${data2.main.temp}`
      })

    }

//     .catch(err => {
//       console.log(`error ${err}`)
//     })
  

//   })

  
// }


  
  



  })

}


