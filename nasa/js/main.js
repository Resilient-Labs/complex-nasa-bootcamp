document.addEventListener('DOMContentLoaded', function () {
  fetch('https://data.nasa.gov/resource/gvk9-iz74.json') 
    .then(res => res.json()) // parse response as JSON 
    .then(data => {
        console.log(data)
        data.forEach(x => {
          let lat = x.location.latitude
          let lon = x.location.longitude

          fetch(`http://api.weatherapi.com/v1/forecast.json?key=e04962555dfb41ddba0150857241710&q=${lat} ${lon}&days=1&aqi=no&alerts=yes
          `)
          .then(res => res.json()) // parse response as JSON 
          .then(data => {
            document.querySelector('ul').innerHTML += `<li>
            Facility: ${x.facility}
            <br>
            Location: ${x.city}
            ${x.state}
            <br>
            Weather: ${data.current.temp_f}℉
            ${data.current.condition.text}
          </li>`
          })
        });
        
    })
});