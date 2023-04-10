document.querySelector(".search").addEventListener("click", locateFacilities);
const facilityUI = document.querySelector("#facility");
const locationUI = document.querySelector("#location");
const weatherUI = document.querySelector("#weather");

function locateFacilities() {
  const nasaUrl = "https://data.nasa.gov/resource/gvk9-iz74.json";

  fetch(nasaUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((nasa) => {
        let center = document.createElement("li");
        let facility = document.createElement("li");
        let city = document.createElement("li");
        let state = document.createElement("li");
        let country = document.createElement("li");
        let zipcode = document.createElement("li");

        (center.innerText = nasa.center),
          (facility.innerText = nasa.facility),
          (city.innerText = nasa.city),
          (state.innerText = nasa.state),
          (country.innerText = nasa.country),
          (zipcode.innerText = nasa.zipcode);
        facilityUI.append(center, facility);
        locationUI.append(city, state, country, zipcode);

        // const apiKey = "8b5166b6b4b915804222044b94f32c6d";
        // const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.location.latitude}&lon=${location.location.longitude}&appid=${apiKey}&units=imperial`;

        const apiKey = "26b3867d75c048e08ec00527230604";
        const weatherUrl = `http://api.weatherapi.com/v1/current.json?q=${nasa.location.latitude},${nasa.location.longitude}&key=${apiKey}`;
        // const weatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${nasa.location.latitude}&lon=${nasa.location.longitude}&key=${apiKey}&units=i`;
        fetch(weatherUrl)
          .then((res) => res.json())
          .then((data2) => {
            // console.log(data2);
            console.log(data2.current.temp_f);
            // let temp = document.createElement("li");
            let temp = document.createElement("li");
            temp.innerText = `Weather: ${data2.current.temp_f}`;
            weatherUI.append(temp);
            // list.append(temp);

            // list.appendChild(
            //   li
            // ).innerText = `${center}, ${facility}, ${city}, ${state}, ${country}, ${zipcode}, Weather: ${temp}`;

            // let temp = document.createElement("li");
            // temp.innerText = data.data[0].app_temp;
          });
      });
    });
}
