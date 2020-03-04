// Complex NASA API
function getLocation(){
fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
.then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      let zipCode = [];
      response.forEach((el)=> {
        // locations.push(el.location.human_address.city.toString());
        // try to fix in order to extract the zip code which are wrapped in a string
        zipCode.push(el.zipcode)
        // WE ALSO NEED of zip code we can get the center name from response.center
        console.log(zipCode)
        console.log(typeof zipCode[342])
        console.log(zipCode[342])
      })
    })
    .catch(err => {
        console.log(`error ${err}`)
        alert("sorry, there are no results for your search")
    });
    getWeather()

  }

function getWeather(){
  // need to create a quick lil forEach that grabs the zipcode, plugs into the api, and just console.log the response for each reported zip code
  // need a new API that takes in zip codes
  fetch('https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&zipcode=32899&oneobservation=true&apiKey=H6XyiCT0w1t9GgTjqhRXxDMrVj9h78ya3NuxlwM7XUs')
  .then(res2 => res2.json()) // parse response as JSON (can be res.text() for plain response)
  .then(response2 => {
    console.log(response2)
   })
   .catch(err2 => {
       console.log(`error ${err2}`)
       alert("sorry, there are no results for your search")
   });
}

getLocation();
