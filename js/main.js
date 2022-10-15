document.querySelector('button').addEventListener('click', runLocation)

function runLocation(){

let url = `https://data.nasa.gov/resource/gvk9-iz74.json`

fetch(url) 
    .then(res => res.json()) // parse response as JSON 
    .then(data => { 
      console.log(data) 
      data.forEach(element => {

        let ul = document.querySelector('ul')
       const li = document.createElement('li')
       ul.appendChild(li)
       let h5 = document.createElement('h5')
       li.appendChild(h5)
       h5.innerText = element.center
       let p = document.createElement('p')
       li.appendChild(p) 
       p.innerText = element.city
       let st = document.createElement('p')
       li.appendChild(st) 
       st.innerText = element.state
       let forecast = document.createElement('p')
       li.appendChild(forecast) 
       console.log(element.city)
       let longitude = element.location.longitude
       let latitude = element.location.latitude
       fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b4addd210572f6566706a4fd7dded19f&units=imperial`) 
        .then(res => res.json()) // parse response as JSON 
        .then(weather => { 
        console.log(weather) 
        forecast.innerText = weather.main.temp
    }) 
      })
    }) 
    .catch(err => { 
        console.log(`error ${err}`) 
    }); 

}
