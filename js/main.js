getResource();
function getResource() {
  let apiUrl = "https://data.nasa.gov/resource/9g7e-7hzz.json";
  fetch(apiUrl)
    .then(res => res.json())
    .then(response => {
      response.forEach(function(e) {
        weather(e.center, e.city, e.state);
      });
    })
    .catch(err => {
      console.log(`error ${err}`);
      alert("Sorry! We couldn't find that!")
    });
}
function weather(resource, city, state) {
  let apiKey = "524901&APPID=67ab040222914eed2da06bf8ab669264";
  let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey + "&units=imperial";
  let location = city + ",US";
  let location2 = city + ", " + state;

  console.log(apiURL);

  fetch(apiURL)
    .then(res => res.json())
    .then(response => {
      let list = document.createElement("li");
      document.querySelector("ul").appendChild(list);
      list.innerHTML = center + ", " + location2 + ", " + response.main.temp;
    })

    .catch(err => {
      console.log(`error ${err}`);
      alert("Sorry! We couldn't find that!")
    });
}
