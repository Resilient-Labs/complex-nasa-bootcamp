

// objectforApi
let apiObject = {
tableProperties:document.getElementById("tableId"),
fetchingApiProperties: fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
    .then(response => response.json())
    .then(firstFetchdata => {
      var i;
      var counter = 0;
    for(i in firstFetchdata){

      var temper = firstFetchdata[i];
       checkWeather(temper);
    }
    })
    .catch(err => {
        alert("error")
    })
}
apiObject.fetchingApiProperties;

// chekingWeatherApifuncions
  function checkWeather(temper){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${temper.location.latitude}&lon=${temper.location.longitude}&appid=4f6276080d5b711d09cdd5b91b0bcca1&units=imperial`)
    .then(response => response.json())
    .then(data => {

      console.log(data)
      //create the TR and the TDS (Columns)
      let tr = document.createElement('tr')
      let td1 = document.createElement('td')
      let td2 = document.createElement('td')
      let td3 = document.createElement('td')
      let td4 = document.createElement('td')
      //set the values for the column
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      //append all the table rows into the table element
      apiObject.tableProperties.appendChild(tr);
      td1.innerHTML = temper.facility;
      td2.innerHTML = temper.location.latitude;
      td3.innerHTML = temper.location.longitude;
      td4.innerHTML = data.main.temp;
    })
  }
