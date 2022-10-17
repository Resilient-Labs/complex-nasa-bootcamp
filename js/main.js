//Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.
// got help from Elvin and Isaiah
document.querySelector('button').addEventListener('click',getInfo)

function getInfo() {
    
fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
    .then(res => res.json())
    .then(data => {
    console.log(data)
    for(let i = 0; i < 400 ;i++){
        //create variables to hold incoming data
        let facility =  data[i].center
         let latitude = data[i].location.latitude
         let longitude = data[i].location.longitude
         console.log(facility)
         console.log(latitude)
         console.log(longitude)

    
      fetch(`http://api.weatherapi.com/v1/current.json?key=40c9a98566674bdfa50150132221510&q=${latitude}&q=${longitude}`) 
         .then(res => res.json())
         .then(data => {
     console.log(data)
     let weather = data.current.condition.text
     console.log(weather)

     const ul = document.querySelector('ul')
     const li = document.createElement('li')
     li.innerText = `${facility} | ${latitude} | ${longitude} | ${weather}`
    
        ul.appendChild(li)
     console.log(ul.appendChild(li))
    
 })
.catch(err => { 
    console.log(`error ${err}`)
})
    
        }
})
.catch(err => { 
    console.log(`error ${err}`)
})
}


