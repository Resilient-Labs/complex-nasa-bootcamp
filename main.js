//Global
let ul = document.querySelector("ul");
const url = `https://data.nasa.gov/resource/gvk9-iz74.json`;

//function to retrieve NASA facilities and take their zipcodes to the weather API
function getCity() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      //Each facility and zipcode is assigned to their own specific variables.
      data.forEach((data) => {
        let facilityName = data.facility;
        let facilityZip = data.zipcode;

        const url = `https://api.weatherapi.com/v1/current.json?key=730156fb7f704212a87155255230604&q=${facilityZip}`; //Weather API

        fetch(url)
          .then((res) => res.json()) // parse response as JSON
          .then((data) => {

            let temp = data.current.temp_f;
            let city = data.location.name;

            //Makes a list of all NASA facilities, along with the current weather in the city that they reside in.
            let li = document.createElement("li");
            li.innerText = `At ${facilityName} in ${city} city, the temperature is ${temp} F`;
            ul.appendChild(li);
          })

          //in case of errors
          .catch((err) => {
            console.log(`error ${err}`);
          });
      });
    })
    //more errors
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

// event listeners
document.querySelector("button").addEventListener("click", getCity);
