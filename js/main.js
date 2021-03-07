// API NASA: https://data.nasa.gov/resource/gvk9-iz74.json
// need api for weather of the nasa location
// https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country},&units=imperial&appid=b4a8249fdb18e85af658ae914f292e78
// user will input state
// */
//Mark helped//
//House Moses!!!!//
const url1 = `https://data.nasa.gov/resource/gvk9-iz74.json`
fetch(url1)
  .then (res=> res.json())
  .then (data=> {
    //replace 3 for data.length for testing//
    for (i = 0 ; i < data.length; i ++){
      const location = data[i].zipcode
      const facility = data[i].center
      const lat = data[i].location.latitude;
      const lon = data[i].location.longitude;
      const url2= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=a082d72d0c30d8a29f9ffca3fc7c1076`
      fetch(url2)
        .then (res => res.json())
        .then (data2 => {
          console.log(data2)
          const row = document.createElement('tr')
          const facilityCell = document.createElement('td') //creating each cell of the row(tr)//
          const locationCell = document.createElement('td')
          const weatherCell = document.createElement('td')
          document.querySelector('tbody').appendChild(row) // row is a variable representing the tr which is the child of tbody//
          row.appendChild(facilityCell)
          //row is already made from line 18, since its not made in the HTML, we can just use dot notation. Analogy:  "row, is like out subject of the sentence","appendChild is like the verb" and "faciltyCell would like like the object"//
          facilityCell.innerHTML = facility
           // ^connecting cell created on line 19 to the data from line 16//
          row.appendChild(locationCell)
          locationCell.innerHTML = location
          row.appendChild(weatherCell)
          weatherCell.innerHTML = data2.weather[0].description
        })
      }
  })
  .catch(err =>{
    window.alert(`error ${err}`);
  })
