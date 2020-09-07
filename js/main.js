//Created by House Gardner
function weatherResult(){
  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(res => res.json())
    .then(response => {
      response.forEach((data) => {
        let table = document.querySelector('table')
        let tr = document.createElement('tr');
        let inputValue = data.city
  fetch("https://api.openweathermap.org/data/2.5/weather?q="+`${inputValue}`+"&appid=d218eddcd1e60fb3ac910f956a8e089c")
    .then(res => res.json())
    .then(response => {
        let fahrenheit = (response.main.temp - 273.15) * 1.8 + 32
        let temp = Math.floor(fahrenheit) + "°" + "F"
        tr.innerHTML = `<tr>
          <td>${data.facility}</td>
          <td>${data.city}</td>
          <td>${data.state}</td>
          <td>${temp}</td>
          </tr>`
        table.appendChild(tr);
      })
    })
  })
};

document.querySelector("button").addEventListener('click', (e) => {
    weatherResult()
})
