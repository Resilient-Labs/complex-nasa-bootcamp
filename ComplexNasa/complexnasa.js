//My Code
// document.querySelector('button').addEventListener('click' , findFacility)
// document.querySelector('.buttontwo').addEventListener('click', findWeather)

// function findFacility(){
//     let facility = document.querySelector('input').value
    
//     const url = `https://data.nasa.gov/resource/gvk9-iz74.json?center=${facility}`
    
//     fetch(url)
//     .then(res => res.json())
//     .then(data => {

//         console.log(data)
//         let center = data[0].center
//         let city = data[0].city
//         let state = data[0].state
//         let country = data[0].country
//         let long = data[0].location.longitude
//         let lat = data[0].location.latitude
//         let status = data[0].status
//         document.querySelector('.center').innerText = center
//         document.querySelector('.city').innerText = city
//         document.querySelector('.state').innerText = state
//         document.querySelector('.long').innerText = long
//         document.querySelector('.lat').innerText = lat
//         document.querySelector('.status').innerText = status
//         document.querySelector('.country').innerText = country
//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     })

// }
// let api_key = "014631d2c96c603952b85db3d997e201"
// function findWeather(){
//     const city = document.querySelector('.city').innerText
//     const country = document.querySelector('.country').innerText
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${api_key}`
    


// fetch(url)
//     .then(res => res.json())
//     .then(data => {
        
//         document.querySelector('.weather').innerText = data.main.temp + " Farenheit"

     
//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     })

// }

//House Code
document.querySelector("button").addEventListener("click",() => {
    fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
    .then(res => res.json()) 
    .then(response => {
      response.forEach( (data) => {
        
        const list = document.querySelector("ol")
        const sentence = document.createElement("li")
      
        
        let center = data.center
        let city = data.city
        let country = data.country
        let long = data.location.longitude
        let lat = data.location.latitude
  
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=014631d2c96c603952b85db3d997e201`)
        .then(res => res.json())
        .then(response => {
          
          let kelvin = response.main.temp
          // convert tempearture to kelvin to fahrenheit
          let fahrenheit = Math.round((kelvin-273.15)*(9/5) + 32)
          sentence.innerHTML = `${center} || ${city}, ${country} || ${fahrenheit}&#8457`
          // write in html the facility  etc 
  
          // this adds li to ol 
          list.appendChild(sentence)
        })
        .catch(err => {
          console.log(`error ${err}`)
          // alert("sorry, there are no results for your search")
        });
      }
    )
    })
    .catch(err => {
      console.log(`error ${err}`)
      // alert("sorry, there are no results for your search")
    });
  })
  