const nasaLocationUrl = `https://data.nasa.gov/resource/gvk9-iz74.json`;

fetch(nasaLocationUrl)
  .then((res) => res.json())
  .then((dataNasa) => {
    console.log(dataNasa);
    dataNasa
      .forEach((element) => {
        let lat = element.location.latitude;
        let lon = element.location.longitude;
        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bfa49cd0e23035eca5ca4631f4272e4d`;

        fetch(weatherUrl)
          .then((res) => res.json())
          .then((dataWeather) => {
            console.log(dataWeather);
            let str = `<tr><td class="facilityName">${element.center}</td><td class="facilityLocation">${element.city},${element.state}</td><td class="weather">${dataWeather.weather[0].description}, ${dataWeather.main.temp}</td></tr>`;
            document.querySelector("#info").innerHTML += str;
          });
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  });
//contributors: Shannon, David, Miriam, Alexa & Roxana
