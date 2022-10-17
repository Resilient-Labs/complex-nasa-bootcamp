// api_key=37EGXi0BUJCqJOfREBAp3bvTFbnGvmI7IhsJeKY4

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

        document.querySelector("#facility").innerText = data[i].facility;
        document.querySelector("#city").innerText = data[i].city;
        document.querySelector("#state").innerText = data[i].state;
        document.querySelector("#country").innerText = data[i].country;
        let facilityName = data[i].facility

       
          let li = document.createElement("li");
          li.innerText = facilityName;
        
          let toDoContainer = document.querySelector("#toDoContainer");
          toDoContainer.appendChild(li);
          
        
      

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

            console.log(Math.round(tempF));
            document.querySelector("#temp").innerText = tempF;
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
