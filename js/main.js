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
    console.log(data)
    // console.log(data)
    //replace 3 for data.length for testing//
    for (i = 0 ; i < data.length; i ++){//runs through each element of array i is each element in arrray
      const facilityName = data[i].center//using to extract and hold variables
      const location = data[i].zipcode
      const url2 = `https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=b4a8249fdb18e85af658ae914f292e78`
      //nested insside first fetch;
    fetch(url2)
    .then (res => res.json())//get responce and formating it into json file
    .then (data2 =>{
      console.log(data2)
      let facilityWeather = data2.main.temp

      const row = document.createElement('tr')
      const facilityCell = document.createElement('td') //creating each cell of the row(tr)//
      const locationCell = document.createElement('td')
      const weatherCell = document.createElement('td')

      document.querySelector('tbody').appendChild(row)
      row.appendChild(facilityCell)
      row.appendChild(locationCell)
      row.appendChild(weatherCell)

      faciltyCell.innerText = facilityName
      locationCell.innerText = location
      weatherCell.innerText = facilityWeather + data2.weather[0].description
    })//second Fetch
    .catch(err =>{
      console.log(`error ${err}`)
    })
    }//for loop
  })//First fetch
  .catch(err =>{
    console.log(`error ${err}`)
  })
