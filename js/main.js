// Use NASA's API to return all of their facility 
// locations (~400). Display the name of the facility,
//  its location, and the weather at the facility currently.
nasaFacility();
function nasaFacility() {
  var api = "https://data.nasa.gov/resource/9g7e-7hzz.json";
  fetch(api)
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      response.forEach(function(el) {
        facility(el.center, el.city, el.state);
      });
    })
    .catch(err => {
      console.log(`error ${err}`);
    });
}
function facility(center, city, state) {
  let loc = city + " ,US ";
  let loc2 = city + " , " + state;
  let key = "059a2e49444b64c6bbf0895bc0ffd972";
  let url ="https://api.openweathermap.org/data/2.5/weather?q=" + loc +"&appid=" + key + "&units=imperial";
  console.log(url);

  fetch(url)
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      let listItem = document.createElement("li");
      document.querySelector("ul").appendChild(listItem);
      listItem.innerHTML = center + " , " + loc2 + " , " + response.main.temp;
    })
    .catch(err => {
      console.log(`error ${err}`);
    });
}