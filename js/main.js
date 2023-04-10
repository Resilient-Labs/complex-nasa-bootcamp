function nasa(){

 let FacilityUl = document.querySelector('#Facility')
 let LocationUl = document.querySelector('#Location')
  // let input = document.querySelector('input').value
  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`) 
    .then(res => res.json()) // parse response as JSON 
    .then(data => { 
      console.log(data) 
      // facility.innerText = `Facility : ${data[0].facility}`
      // location.innerText = `Location : ${data[0].center}`
      data.slice(0,5).forEach((Nasa) => {
        // console.log(Nasa.facility)
        // console.log(Nasa.center)
        // console.log(Nasa.location.latitude)
        // console.log(Nasa.location.longitude)
        let  lat = Nasa.location.latitude
        let  lon = Nasa.location.longitude 
        let facility = document.createElement('li')
        let center = document.createElement('li')
        facility.innerText = Nasa.facility
        center.innerText = `${Nasa.center}, ${Nasa.city}, ${Nasa.state}, ${Nasa.zipcode}`
        FacilityUl.append(facility)
        LocationUl.append(center)
        getWeather(lat,lon)})
      }) 
     
      .catch(err => { 
          console.log(`error ${err}`) 
      });
}
      
    
//end of nasa api function
//beginning weather function
     
      
      function getWeather(lat,lon){
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=43ed172859a3633c1ee02ffb7a8cd7ce&units=Imperial`
        let WeatherUl = document.querySelector('#Weather')
        fetch(url) 
        .then(res => res.json()) // parse response as JSON 
        .then(W => { 
          console.log(W)
          let weather = document.createElement('li')
          weather.innerText = W.main.temp
          WeatherUl.append(weather)
          
        }) 
        .catch(err => { 
            console.log(`error ${err}`) 
        });
      }
  

 

  




const button = document.querySelector('button')
button.addEventListener('click', nasa)




//the base of this code was worked on collaboratively with house gardner