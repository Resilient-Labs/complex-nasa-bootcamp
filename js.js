document.querySelector('button').addEventListener('click', getFacility)


function getFacility(){
  const url = `https://data.nasa.gov/resource/gvk9-iz74.json`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data[0])
      document.querySelector('h2').innerText = data[0].city;
    })
  
    const urlTemp = `https://api.openweathermap.org/data/2.5/weather?q=${city}, ${country}&units=imperial&appid=29c28a8cb6184cb23f525aef7d0c2a88`


    fetch(urlTemp)
    .then( res => res.json())
    .then(data => {
      console.log(data.main)
      document.querySelector('h3').innerText = `The Temperature here is' ${data.main.temp}`

    }
      )


    .catch(err => {
      console.log(`error ${err}`)
    });





  }