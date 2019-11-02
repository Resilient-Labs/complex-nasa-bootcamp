// let key = "af9fe3d2781542ac22344d65fccfe8e5";
// let key = "c51239eb87e6cc3493d0eeacdb8813db";
let key = "bf82c05e6c0cd4fbe45ad5d6e92924b0";
document.querySelector("button").onclick= () => {
  fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
  .then(res=> res.json())
  .then(res => {
    for(let i=0;i<res.length;i++){
      let container = document.createElement("SECTION");
      let name = document.createElement("H2");
      name.textContent= "Name: "+res[i].center;
      let facility = document.createElement("H3");
      facility.textContent= "Facility: "+res[i].facility;
      let city = document.createElement("H4");
      city.textContent = "City: "+res[i].city;
      let state = document.createElement("H4");
      state.textContent = "State: "+res[i].state;
      let weather = document.createElement("H3");
      let lat = res[i].location.latitude;
      let lng = res[i].location.longitude;
      fetch(`https://api.darksky.net/forecast/${key}/${lat},${lng}`)
        .then(result=> result.json())
        .then(result => {
          weather.textContent = "Temperature: "+result.currently.temperature;
        })
        .catch(err => {
          console.log(`error ${err}`);
          alert('sorry, there are no results for your search');
        });
      container.appendChild(name);
      container.appendChild(facility);
      container.appendChild(weather);
      container.appendChild(city);
      container.appendChild(state);
      document.body.appendChild(container);
    }
  })
  .catch(err => {
    console.log(`error ${err}`);
    alert('sorry, there are no results for your search');
  });
};
