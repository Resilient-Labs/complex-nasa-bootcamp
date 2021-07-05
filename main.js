document.getElementById('btn').addEventListener('click',function(e) {
  e.preventDefault()
  var nasa = "https://data.nasa.gov/api/views/gvk9-iz74/rows.json"
  fetch(nasa)
    .then(response => response.json())
    .then(data => {
      console.log(data.data)
      //looping through the objects
      data.data.forEach(function(facility){
        // console.log("this is the lat" + facility[20][1]);
        // console.log("this is long" + facility[20][2]);
        var latitude = facility[20][1]
        var long = facility[20][2]
        var facilityName = facility[10]
        var facilityLocation = facility[22]
        var weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${long}&units=imperial&appid=817fd2b572e43472215e6f75af021b34`
        fetch(weatherApi)
        .then(response => response.json())
        .then(data => {
          console.log(data.main.temp)
          let info = document.createElement('p');
          //appeding to the DOM
          document.getElementsByTagName("body")[0].appendChild(info);
          info.innerHTML = info.innerHTML + "<strong>Station Name: </strong>" + facilityName + ", <strong>Location: </strong>" + facilityLocation + " <strong> Weather:</strong> " + data.main.temp + "&#8457;"
        })
        .catch(err => console.log('this dont work, heres why:' + err))
      })
    })
    .catch(err => console.log('this dont work, heres why:' + err))
})
