//Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.

//Note: we are doing a 'fetch within a fetch', basically. aside from a lat and lon api for the openweather (weather) aspect of this, we also needed the nasa link on line 11 as being the 'master database' containing all Nasa center info (facility name and location).

//Addt'l note: to get all 485 locations, we need a loop (otherwise with the one click, we'd only see the first center. I decided to go with a forEach loop.)

document.querySelector('button').addEventListener('click', getItAll)

function getItAll(){
  let facility = document.querySelector('#facility')
  let location = document.querySelector('#location')
  let weather = document.querySelector('#weather')

  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
  
    
    data.slice(0,485).forEach(nasa => { //slice: *once ALL DONE*, changed to 0, 485 - 485 being the total number of facilities available. During coding process, I kept it to 5 max. to prevent maxing out all my database calls in one day
      let facilityLi = document.createElement('li')
      let locationLi = document.createElement('li') // what were doing here is creating a blank li 
      let lat = nasa.location.latitude
      let lon = nasa.location.longitude

      getWeather(lat, lon)
      

      //below is what we are filling the lis with:
      facilityLi.innerText = nasa.facility
      locationLi.innerText = nasa.center
       

      facility.append(facilityLi)
      location.append(locationLi)
    })
   
    
    function getWeather(lat, lon){
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3a66c93c3a0ed6be2be42960d8f2f642&units=Imperial`

      fetch(url)
      .then(res => res.json()) //parse response as JSON
      .then(allnasa => { //just an arrow function, so that variable (allnasa is what I called it in this case) can be named anything 
        console.log(allnasa) //allnasa = data from the weather api, refer to element first mentioned in .then on line 43 
        
        let weatherLi = document.createElement('li')
        weatherLi.innerText = allnasa.main.temp

        weather.append(weatherLi)
        
      })
      .catch(err => {
        console.log(`error ${err}`)
        });
    }
  })
  
  .catch(err => {
  console.log(`error ${err}`)
  });

}



