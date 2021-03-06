//Goal: grab locations from NASA's API and get the weather of each location
// document.querySelector('.button').addEventListener('click', getData)

let tableBody = document.querySelector('.tableBody')
fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
  .then(res => res.json())
  .then(data => {
    // console.log(data)
    data.forEach((nasa, i) => {
      let newRow = document.createElement('tr')
      let country = document.createElement('td')
      let cityState = document.createElement('td')
      let facility = document.createElement('td')
      let weather = document.createElement('td')
      country.innerText = nasa.country
      cityState.innerText = `${nasa.city}, ${nasa.state}`
      facility.innerText = nasa.facility
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${nasa.location.latitude}&lon=${nasa.location.longitude}&units=imperial&appid=8511e5dcf8e8d6a1a604e18d6ec8ec8f`)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          weather.innerText = `${Math.floor(data.main.temp)}F, ${data.weather[0].main}.`
          // console.log(weather);
        })
        .catch(err => {
          console.log(`error ${err}`)
        })


      newRow.appendChild(country)
      newRow.appendChild(cityState)
      newRow.appendChild(facility)
      newRow.appendChild(weather)
      tableBody.appendChild(newRow)
    });

  })
  .catch(err => {
    console.log(`error ${err}`)
  })
