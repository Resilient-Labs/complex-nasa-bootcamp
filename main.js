const selectBttn = document.querySelector('button')
const showItems = document.querySelector('#list')


function locationFinder() {
  const url = (`https://data.nasa.gov/resource/gvk9-iz74.json`)

  fetch(url)
    .then(res => res.json())
    .then(nasaData => {
      // console.log(nasaData)
      const addToDom = (obj) => {
        console.log(obj)
        const { latitude: lat, longitude: lon } = obj.location
        // console.log(lat)
        // console.log(lon)
        const { facility: addr, city, state } = obj

        const listItem = document.createElement('li')
        listItem.innerText = `${addr}, ${city}, ${state}`



        const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b0c8db590e3443b4265a5c0a41f24628`

        fetch(url2)
          .then(res => res.json())
          .then(weatherData => {
            console.log(weatherData)
            if (weatherData?.main?.temp) {
              let kelvin = weatherData.main.temp
              let f = (kelvin - 273.15) * 1.8 + 32
              // weather.innerText = (`temp ${Math.floor(f)}`)
              listItem.innerText += ` Temp: ${Math.floor(f)}`
            }

          }
          )
        showItems.appendChild(listItem)
        // throw new Error('stop loop')

      }
      nasaData.forEach(addToDom)
    })
}
selectBttn.addEventListener('click', locationFinder)





