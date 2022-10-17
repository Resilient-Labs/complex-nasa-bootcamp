document.querySelector('button').addEventListener('click', showNASA)

function showNASA(){
  let URL = `https://data.nasa.gov/resource/gvk9-iz74.json`

    fetch(URL)
    .then(res => res.json())
    .then(data => {
    const facility = document.querySelector('ul')

    for(i=0; i < data.length; i++) {
      let li = document.createElement('li');
      li.innerText= `Facility: ${data[i].facility} | Location: ${data[i].city}, ${data[i].state} | Weather: `
      facility.appendChild(li);

      let lat = data[i].location.latitude
      let long = data[i].location.longitude



    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2a743e201562fcc121b223ef8042d1ff&units=imperial`

      fetch(weatherURL)
      .then(res => res.json())
      .then(WeatherData => {
        console.log(WeatherData)
        li.innerText += ` ${WeatherData.weather[0].description} Temperature: ${WeatherData.main.temp} °F`
      })

    }

     /*.catch(err => {
       console.log(`error ${err}`)
    });
})}*/
 })}