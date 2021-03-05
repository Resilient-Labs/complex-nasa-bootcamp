document.querySelector('button').addEventListener('click', getFacility)

function getFacility() {
  let url = `https://data.nasa.gov/resource/gvk9-iz74.json`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      for (let i = 0; i < 3; i++) {


        let lat = data[i].location.latitude
        let lng = data[i].location.longitude
        let getLatLong = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=6976f442527ba609d27aa3e3af5eb139`
        fetch(getLatLong)
          .then(res => res.json())
          .then(dataWeather => {
            console.log(getLatLong);

            let listFacility = document.createElement('li')
            let text = document.createTextNode('Facility Name = ' + data[i].facility)
            listFacility.appendChild(text)
            document.getElementById('info').appendChild(listFacility)

            let listCity = document.createElement('p')
            let textItem = document.createTextNode('City = ' + data[i].city)
            listCity.appendChild(textItem)
            listFacility.appendChild(listCity)


            let listWeather = document.createElement('p')
            let weatherItem = document.createTextNode(dataWeather.main.temp)
            listWeather.appendChild(weatherItem)
            listFacility.appendChild(listWeather)
          })
      }
    })

}
