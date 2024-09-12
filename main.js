// real one 

document.querySelector("button").addEventListener("click", myWeather);

function myWeather() {
  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);

      for (let i = 0; i < 400; i++) {
        console.log(data[i]);
        console.log(data[i].facility);

        const lati = data[i].location.latitude;
        console.log(lati);
        const long = data[i].location.longitude;
        console.log(long);

        let facilityName = data[i].facility;
        let cityName = data[i].city;
        let stateName = data[i].state;
        let countryName = data[i].country;

        let li = document.createElement("li");
        li.innerText = facilityName;

        let liCity = document.createElement("li");
        liCity.innerText = cityName;

        let liState = document.createElement("li");
        liState.innerText = stateName;

        let liCountry = document.createElement("li");
        liCountry.innerText = countryName;

        let toDoContainer = document.querySelector("#toDoContainer");
        toDoContainer.appendChild(li);

        let toDoContainerOne = document.querySelector("#toDoContainerOne");
        toDoContainerOne.appendChild(liCity);

        let toDoContainerTwo = document.querySelector("#toDoContainerTwo");
        toDoContainerTwo.appendChild(liState);

        let toDoContainerThree = document.querySelector("#toDoContainerThree");
        toDoContainerThree.appendChild(liCountry);

        fetch(
          `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lati}&lon=${long}`
        )
          .then((res) => res.json()) // parse response as JSON
          .then((data) => {
            console.log(data);

            let temp =
              data.properties.timeseries[0].data.instant.details
                .air_temperature;

            const tempF = temp * 1.8 + 32;
            const tempFNew = Math.round(tempF);

            // console.log(Math.floor(tempF));

            let temptName = tempFNew + "°F";

            let liTempt = document.createElement("li");
            liTempt.innerText = temptName;

            let toDoContainerFour =
              document.querySelector("#toDoContainerFour");
            toDoContainerFour.appendChild(liTempt);

          });
      }
    });
}

// from my todo list
// let toDoContainer = document.querySelector("#hi");
// function addToList() {
//   let li = document.createElement("li");
//   li.innerText = tempF.value;

//   toDoContainer.appendChild(li);
//   typeHere.value = " ";}
