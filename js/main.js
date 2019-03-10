//put the API endpoint URL in a variable
//call the fetch request to that API to retrieve the data we're looking for
//the data we're looking for from the NASA APS is: the facilites name, location, (city, state, country)

//we want to pass the location from the first API into the second api
//the weather API takes in the city and country as the parameters to search for the weather in a location
getFacility();
function getFacility() {
  var apiUrl = "https://data.nasa.gov/resource/9g7e-7hzz.json";
  fetch(apiUrl)
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      response.forEach(function(e) {
        getWeatherStatus(e.center, e.city, e.state);
      });
    })
    .catch(err => {
      console.log(`error ${err}`);
      // alert("sorry, there are no results for your search")
    });
}
function getWeatherStatus(center, city, state) {
  let location = city + ",US";
  let location2 = city + ", " + state;
  let apiKey = "f1bc4d248bae066ff924465ffe321195";
  let apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=" +
    apiKey +
    "&units=imperial";

  console.log(apiURL);

  fetch(apiURL)
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      let listItem = document.createElement("li");
      document.querySelector("ul").appendChild(listItem);
      listItem.innerHTML =
        center + ", " + location2 + ", " + response.main.temp;
    })
    .catch(err => {
      console.log(`error ${err}`);
      // alert("sorry, there are no results for your search")
    });
}
