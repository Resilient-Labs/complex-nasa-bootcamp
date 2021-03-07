// Worked on NASA Complex API with House Hayden
const list = document.querySelector("#facilities");
document.querySelector("button").addEventListener("click", nasaAPI);

function nasaAPI() {
    const url = "https://data.nasa.gov/resource/gvk9-iz74.json";
    fetch(url)
    .then(res => res.json())
    .then(data => data.forEach(result => weatherAPI(result)))
    .catch(err => console.log(`error ${err}`));
}

  function weatherAPI(facility) {
    const apiKey = 'ca354209fe8bbaf5bd0c1e502f4c1040'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${facility.location.latitude}&lon=${facility.location.longitude}&appid=${apiKey}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const listItem = document.createElement("li")
        const fahrenheit = Math.round((data.main.temp-273.15)*(9/5) + 32); //data.main.temp is in Kelvin

        listItem.innerHTML +=  `${facility.center} || ${facility.city}, ${facility.country} || ${fahrenheit}&#8457`;
        list.appendChild(listItem);
    })
    .catch(err => console.log(`Error: ${err}`));
  }