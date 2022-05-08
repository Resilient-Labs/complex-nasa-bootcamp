document.querySelector('button').addEventListener('click', nasaFacilities)




function nasaFacilities(){ 
    
    
    fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
    .then(res => res.json()) // parse response as JSON
        .then(data => { 
        console.log(data)
       
        for(let i = 0; i < data.length; i++){

        let name = data[i].center
        console.log(name)

        let location = data[i].city
        console.log(location)

       
        let lat = data[i].location.latitude
        console.log(lat)
        let lon = data[i].location.longitude
        console.log(lon)

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=7f4ae86d233472aceaa1080ace956095`)
    .then(res => res.json()) // parse response as JSON
    .then(data => { 
        console.log(data)


        let h2 = document.createElement('h2')
        h2.innerText = 'Name: ' + name
        document.querySelector('.locationHere').appendChild(h2)



        let h3 = document.createElement('h3')
        h3.innerText = 'Location: ' + location
        document.querySelector('.locationHere').appendChild(h3)

        let feelsLike = data.main.feels_like
        console.log(feelsLike)
        let h4 = document.createElement('h4')
        h4.innerText = 'Temperature: ' + feelsLike+' degrees Farenheit'
        document.querySelector('.locationHere').appendChild(h4)
    
        
        let description = data.weather[0].description
        let h5 = document.createElement('h5')
        h5.innerText = 'Weather: ' + description
        document.querySelector('.locationHere').appendChild(h5)
        })

    }})}

   

  