const weatherApiKey = "15c09c2638274e14e02882521244e137";
document.querySelector(".button").addEventListener("click", getInfo);
function getInfo() {
  fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
    .then((res) => res.json())
    .then((data) => {
      let ul = document.querySelector("#FacNameLocWea");
      for (let i = 0; i < data.length; i++) {
        let lat = Number(data[i].location.latitude).toFixed(0);
        let lon = Number(data[i].location.longitude).toFixed(0);
        let weatherQueryStr = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
        fetch(weatherQueryStr)
          .then((res) => res.json())
          .then((dataWeather) => {
            console.log(data.facility);
            let weatherString = `Facility: ${data[i].facility}; Location (Lat, Lon): ${lat}, ${lon}; Current Temperature (K): ${dataWeather.main.temp}`;
            let li = document.createElement("li");
            li.innerText = weatherString;
            ul.appendChild(li);
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
