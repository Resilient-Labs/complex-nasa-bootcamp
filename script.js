// Display the name of all the facilities.
//Display their location,
//Display the weather at all facilities currently.

document.querySelector("button").addEventListener("click", search);

// This function allows you to get the input the user put in the text box.
function search() {
  const url = `https://data.nasa.gov/resource/gvk9-iz74.json`;

  //NASA Facilities API
  fetch(url)
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let location = data[i].location;
      let longitude = location.longitude;
      let latitude = location.latitude;
      let facility = data[i].facility;

      let ul = document.querySelector("ul");
      const li = document.createElement("li");
      ul.appendChild(li);
      let h5 = document.createElement("h5");
      let h4 = document.createElement("h4");
      let h3 = document.createElement("h3");
      let h2 = document.createElement("h2");
      li.appendChild(h5);
      li.appendChild(h4);
      li.appendChild(h3);
      li.appendChild(h2);
      h5.innerText = facility;
      h3.innerText = data[i].city;
      h2.innerText = data[i].state;


      let apiKey = process.env.API_KEY
      //Weather API
      let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

      fetch(weatherUrl)
      .then((res) => res.json()) // parse response as JSON
      .then((weatherData) => {

        //This is used to round the Temperture and then convert it to a string. This string is then concatenated with a degree symbol.
        let roundedTemp = Math.round(weatherData.main.temp);
        let finalTemp = roundedTemp.toString() + " ° F";
        h4.innerText = finalTemp
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
    }
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });
}
