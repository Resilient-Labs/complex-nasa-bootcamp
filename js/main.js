document.querySelector('#getData').addEventListener('click', getCenterData)

function getCenterData() {
  let urlNASA = 'https://data.nasa.gov/resource/gvk9-iz74.json'

  fetch(urlNASA)
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const displayName = data[i].center
        const displayLocation = data[i].city

        let centerZipcode = data[i].zipcode.substring(0,5)
        let urlWeather = `https://api.openweathermap.org/data/2.5/weather?zip=${centerZipcode},US&units=imperial&appid=____________________________`

        console.log(centerZipcode)
        fetch(urlWeather)

          .then(res => res.json()) 
          .then(tempData => {
            const displayTemp = tempData.main.temp
            const li = document.createElement('li')
            li.innerText = `Name: ${displayName}, Location: ${displayLocation}, Temperature: ${displayTemp}`
            document.querySelector('#container').appendChild(li)
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