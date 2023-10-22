//The user will enter a name of facility and zip code to find weather at current location. Use that location to get the name of facility and weather of that facility location! https://data.nasa.gov/Management-Operations/NASA-Facilities/scmi-np9r

//connect button  function "getTemp"
document.querySelector("button").addEventListener("click", getFacilityNameWeather);



function getFacilityNameWeather() {

  const urlNasa = `https://data.nasa.gov/resource/gvk9-iz74.json`;
  

  //using method fetch to request my data from that api using url
  fetch(urlNasa) // go get api
    
    .then((res) => res.json())
    .then((data) => {
    
      console.log(data)
            
      data.forEach((facility)=>{ 
        // console.log(
        //   `Facility Name: ${facility.center}  Zipcode: ${facility.zipcode}`
        // );
  let facilityCenter = facility.center;
  let zipCode = facility.zipcode;
  const urlZip = `http://api.weatherapi.com/v1/current.json?key=eb88852a78b84a5ab07191927231810&q=${zipCode}`;
  fetch(urlZip) // go get api

  //.then property passes param res which responds with JSON parsing out the data you requested 
    .then((res) => res.json())
    .then((data) => {

      // console.log("Center Weather: " + JSON.stringify(data)); 
      let listFacility = document.createElement('li');
      let temp = Math.floor((data.current.temp_f))
      let fTemp = `${temp}°F`;
      
      let text = document.createTextNode(`${facilityCenter} ${fTemp}`)
      listFacility.appendChild(text)
      document.querySelector('#list').appendChild(listFacility)

    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
  })
})
}

