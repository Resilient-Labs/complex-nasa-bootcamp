//display a list of all nasa locations
//

document.querySelector("button").addEventListener("click", findList);

function findList() {
  let url = "https://data.nasa.gov/resource/gvk9-iz74.json";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
    //   console.log(data);
      for (i = 0; i < data.length; i++) {
        let lat = data[i].location.latitude;
        let lon = data[i].location.longitude;
        let centerName = data[i].center;
        let cityName = data[i].city;
        // console.log(centerName); //the center name
        // console.log(cityName); //the city name
        let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bcd38d1b6d16b6ef3a872197b4588665`;
        fetch(url2)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data.main.temp); //the weather
            
            let weather = (data.main.temp - 273.15)*9/5 +32
            let centerInfo = `center name: ${centerName} | center location: ${cityName} | weather: ${weather} fahrenheit`;

            // console.log(centerInfo);
            let ulToAppend = document.querySelector('.showsLocales')
            let p = document.createElement("p");
            p.innerText = centerInfo
            ulToAppend.appendChild(p)
          });
      }
    })

    .catch((err) => console.log(err));
}
