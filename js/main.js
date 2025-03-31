//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const nasaUrl = `https://data.nasa.gov/resource/gvk9-iz74.json`
  const weatherUrl = `https://api.weatherbit.io/v2.0/current?key=24dea913fd5046a8a94720d1ed563839&units=I`


  

// Step 1: Fetch NASA facility data
// Use fetch() to get data from the NASA API: https://data.nasa.gov/resource/gvk9-iz74.json
fetch(nasaUrl)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data) // console log data
      //   let li = document.createElement('li');
      //   const facilities = document.getElementById('ul');
      //   facilities.appendChild(li);
      
// Step 2: Extract relevant data
// Loop through the facilities and extract:
for (let i = 0; i <= data.length; i++) {
  const column = document.createElement("tr")
  column.innerHTML = `<td>${data[i].center}</td>
  <td>${data[i].city}</td>
  <td>${data[i].state}</td>`
  document.querySelector('table').appendChild(column)
  let lat = data[i].location.latitude
  let lon = data[i].location.longitude


// Step 3: Fetch weather data for each facility
 fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=85115e092db4e50bd131388902a4936d`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data) // console log data
        let temp = data.main.temp
        column.innerHTML += `<td>${temp}</td>`
        let weather = data.weather[0].description
        column.innerHTML += `<td>${weather}</td>`
      })
}
})

// - Coordinates (latitude, longitude)


      .catch(err => {
          console.log(`error ${err}`)
      });
}


// Loop through the facilities
// For each facility:
// - Use its coordinates to make a request to the Weatherbit API
// - Convert response to JSON
// - Extract weather information (e.g., temperature, conditions)

// Step 4: Display the data on the page
// - Create a `div` for each facility
// - Inside each `div`, add:
//   - Facility name
//   - Location
//   - Weather data
// - Append each `div` to a container element in the DOM
// 
// 
// 
// 
// 
// 
// //   const data1 = data.map( () => {
//    return {
//     center: data[i].center,
//     city: data[i].city,
//     state: data[i].state,
    
// }
// })
//   console.log(data1)
