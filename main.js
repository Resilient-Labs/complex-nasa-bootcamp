// Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.
document
  .querySelector("#facilitiesBtn")
  .addEventListener("click", getNasaFacilities);

function getNasaFacilities() {
  const facilityUrl = "https://data.nasa.gov/resource/gvk9-iz74.json";
  const weatherAPIKey = "9ee140de1f9f43735062a4c0d89dfe0c"; // api key
  document.querySelector("#results").innerHTML = "";
  const table = document
    .querySelector("#results")
    .appendChild(document.createElement("table"));
  table.classList.add("nasaFacilitiesTable");

  // Create table headings
  let headingsRow = table.appendChild(document.createElement("tr"));

  let headingName = headingsRow.appendChild(document.createElement("th"));
  headingName.innerText = "Facility Name";

  let headingType = headingsRow.appendChild(document.createElement("th"));
  headingType.innerText = "Facility Type";

  let headingCity = headingsRow.appendChild(document.createElement("th"));
  headingCity.innerText = "City";

  let headingState = headingsRow.appendChild(document.createElement("th"));
  headingState.innerText = "State";

  let headingZip = headingsRow.appendChild(document.createElement("th"));
  headingZip.innerText = "ZIP Code";

  let headingLat = headingsRow.appendChild(document.createElement("th"));
  headingLat.innerText = "Latitude";

  let headingLong = headingsRow.appendChild(document.createElement("th"));
  headingLong.innerText = "Longitude";

  let headingWeather = headingsRow.appendChild(document.createElement("th"));
  headingWeather.innerText = "Weather";

  fetch(facilityUrl)
    .then((facilityRes) => facilityRes.json()) // parse response as JSON
    .then((facilityData) => {
      for (let i = 0; i <= facilityData.length; i++) {
        const facilityName = facilityData[i].center;

        const facilityType = facilityData[i].facility;
        const facilityCity = facilityData[i].city;
        const facilityState = facilityData[i].state;
        const facilityZip = facilityData[i].zipcode;
        const facilityLat = facilityData[i].location.latitude;
        const facilityLong = facilityData[i].location.longitude;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${facilityLat}&lon=${facilityLong}&appid=${weatherAPIKey}`;

        // look for distinct values for facilityName
        // add data to an array and remove the dupes

        fetch(weatherUrl)
          .then((weatherRes) => weatherRes.json())
          .then((weatherData) => {
            const facilityWeather = Math.round(
              (weatherData.main.temp - 273.15) * (9 / 5) + 32
            );

            // create table row
            let row = table.appendChild(document.createElement("tr"));

            // Add table cells for facility information
            let cellName = row.appendChild(document.createElement("td"));
            cellName.innerText = facilityName;

            let cellType = row.appendChild(document.createElement("td"));
            cellType.innerText = facilityType;

            let cellCity = row.appendChild(document.createElement("td"));
            cellCity.innerText = facilityCity;

            let cellState = row.appendChild(document.createElement("td"));
            cellState.innerText = facilityState;

            let cellZip = row.appendChild(document.createElement("td"));
            cellZip.innerText = facilityZip;

            let cellLat = row.appendChild(document.createElement("td"));
            cellLat.innerText = facilityLat;

            let cellLong = row.appendChild(document.createElement("td"));
            cellLong.innerText = facilityLong;

            let cellWeather = row.appendChild(document.createElement("td"));
            cellWeather.innerText = `${facilityWeather}°F`;
          });
      }
    })

    .catch((err) => {
      console.log(`error ${err}`);
    });
}
