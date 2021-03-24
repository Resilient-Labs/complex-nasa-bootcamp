/* 2 api pseudocode
API NASA: https://data.nasa.gov/resource/gvk9-iz74.json
need api for weather of the nasa location
https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country},&units=imperial&appid=b4a8249fdb18e85af658ae914f292e78
user will input state
*/
//Mark helped//
//House Moses!!!!//
const url1 = `https://data.nasa.gov/resource/gvk9-iz74.json`

fetch(url1)
.then (res => res.json())
.then (data => {
  // console.log(data)
  //replace 3 for data.length for testing//
  for (i = 0 ; i < data.length; i ++){
    const facility = data[i].center
    const location = data[i].zipcode
    console.log(data);
    console.log(location);
    const url2 = `https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=3dcf2283444af6b2ce53add6e21f45c9`
    fetch(url2)
    .then(res => res.json())
    .then(result => {
      console.log(result);
      let facilityWeather = result.main.temp //result holidng the array results

      let row = document.createElement('tr')
      let column1 = document.createElement('td')//creating each cell of the row(tr)//
      let column2 = document.createElement('td')
      let column3 = document.createElement('td')

      document.querySelector('tbody').appendChild(row) // row is a variable representing the tr which is the child of tbody//
      row.appendChild(column1) //appendChild is going to change the element by creating a row/column
      row.appendChild(column2)
      row.appendChild(column3)//row is already made varaible row. since its not made in the HTML, we can just use dot notation. Analogy:  "row, is like out subject of the sentence","appendChild is like the verb" and "faciltyCell would like like the object"//
      column1.innerText = facility
       // ^connecting cell created on line 19 to the data from line 16//
      column2.innerText = location
      column3.innerText = facilityWeather + `°F, ` + result.weather[0].description
    })
    .catch(err => {
      console.log(`error ${err}`); // for the second Fetch
    })
  }
})
.catch(err => {
  console.log(`error ${err}`); //for the First Fetch
})
