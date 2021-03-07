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
  .then (res=> res.json())
  .then (data=>{
    // console.log(data)
    //replace 3 for data.length for testing//
    for (i = 0 ; i < 3; i ++){
      const location = data[i].zipcode
      const url2= `https://api.openweathermap.org/data/2.5/weather?zip=${location},US&appid=b4a8249fdb18e85af658ae914f292e78`
      //nested insside first fetch;
      fetch(url2)
        .then (res => res.json())
        .then (data2 =>{
      const facility = data[i].center
      // const location = data[i].zipcode
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
      const weather = data2[i].temp
      weatherCell.innerHtml =
      console.log(places)
      console.log(facility,row)
    })
  }
  })
  .catch(err =>{
    alert(`error ${err}`)
  })
