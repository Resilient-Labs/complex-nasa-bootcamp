const url = 'https://data.nasa.gov/resource/gvk9-iz74.json'

fetch(url)
.then(res => res.json())
.then(data => {
  console.log(data);
  for (var i = 0; i < data.length; i++){
    let row = document.createElement('tr')
      let weatherCeil = document.createElement('td')
    const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${data[i].location.latitude}&lon=${data[i].location.longitude}&appid=caab8d07c64bfd5f209298466bc24262`
    fetch(url2)
    .then(res => res.json())
    .then(data2 => {
      let weather = data2.weather[0].description

      weatherCeil.innerText = weather
      row.appendChild(weatherCeil)
      console.log(data2.weather[0].description)
    })
    .catch(err => {console.log(`error ${err}`) })

    let facility = data[i].center
    let location = data[i].city


    let facilityCeil = document.createElement('td')  //Subject is Document, Verb is createElement and Object is the td
    let locationCeil = document.createElement('td') //Sounds like SVO in English language

    // document.createElement('td')
    facilityCeil.innerText = facility
    locationCeil.innerText = location
    row.appendChild(facilityCeil)
    row.appendChild(locationCeil)
    document.querySelector('tbody').appendChild(row)
    console.log(facility);
    console.log(location);
  }
})
.catch(err => {console.log(`error ${err}`)    });
