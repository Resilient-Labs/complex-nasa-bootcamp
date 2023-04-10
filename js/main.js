function runStats(){
  let url = 'https://data.nasa.gov/resource/gvk9-iz74.json'
  fetch(url) 
  .then(res => res.json()) 
  .then(data => { 
    let zipCode = ''

    for(let i = 0; i < data.length; i++){ 
      let center = data[i].center 
      let city = data[i].city
      let state = data[i].state
      zipCode = data[i].zipcode
      
      let weatherUrl = `http://api.weatherapi.com/v1/current.json?key=f16a6e44f6494fa4baa175942230504&q=${zipCode}`
      
      fetch(weatherUrl) 
      .then(res => res.json()) 
      .then(weatherData => { 
        let temp = weatherData.current.temp_f
        let centerNameItem = document.createElement('li')
        centerNameItem.innerText = center + ', ' + city + ', ' + state + ', ' + temp
        document.querySelector('ul').appendChild(centerNameItem)
      })
      
      .catch(err => { 
          console.log(`error ${err}`) 
      })
      
    } //for loop 
  })

    .catch(err => { 
      console.log(`error ${err}`) 
  })
  
} //runStats 

runStats()

//zipcode is coming from the Nasa API and being used as a query paramter in the weather api to fetch the weather 