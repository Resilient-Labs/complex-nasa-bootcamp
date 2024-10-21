
addEventListener("DOMContentLoaded", (event) => {
    console.log('PAGE LOADED')
    const url = 'https://data.nasa.gov/resource/gvk9-iz74.json'

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.forEach(element => {
            let lat = element.location.latitude
            let long = element.location.longitude

            fetch(`http://api.weatherapi.com/v1/current.json?key=e04962555dfb41ddba0150857241710&q=${lat} ${long}&aqi=no`)
                .then(response => response.json())
                .then(dataTwo => {
                 document.querySelector('ul').innerHTML += `<li>Facility: ${element.facility}</br> Location: ${dataTwo.location.name}</br>Temperature: ${dataTwo.current.temp_f}</li>`
             })
                 .catch(error => {
                 console.log(`${error}`)
              });

       });

      })
      .catch(error => {
        console.log(`${error}`)
      });

});


//http://api.weatherapi.com/v1/current.json?key=e04962555dfb41ddba0150857241710&q=London&aqi=no