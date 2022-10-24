// worked with Ty, Shawna, Carter and Jasmine. Referenced Github.

// start function getTheTempature
// declare variable URL with the api
// .then code (fetch json api)
// create constant variable to store facility name via document.getelement
// const facility = document.getElementsByClassName('facilityName')
// create for loop

function getInformation() {
  let url = `https://data.nasa.gov/resource/gvk9-iz74.json`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const facilityAndLocation = document.querySelector("ul");
        let li = document.createElement("li");
        facilityAndLocation.appendChild(li);
        const lat = data[i].location.latitude;
        const lon = data[i].location.longitude;

        li.innerText = `Facility: ${data[i].facility} and the Location: ${data[i].city} | ${data[i].state}`;

        let secondUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=479a9ad2127d323dc52867dfc2c198c9`;

        fetch(secondUrl)
          .then((res) => res.json())
          .then((data2) => {
            let kelvinTemp = data2.main.temp;
            let convertTemp = 1.8 * (kelvinTemp - 273) + 32;

            console.log(data2);

            li.innerText += ` | Current Tempature: ${Math.floor(convertTemp)}`;
          });
      }
    })
    .catch((err) => {
      console.log(`err ${err}`);
    });
}

getInformation();

// document.querySelector('button').addEventListener('click', getDates)
// function nasaFacilityLocationWeather(){

//     fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
//     .then(res => res.json())
//     .then(data => {
//         console.log()
//         for(let i = 0; i < 5; i++){
//             const uL = document.querySelector('ul')
//             const lI = document.createElement('li')
//             uL.appendChild(lI)
//             const lat = data[i].location.latitude
//             const lon = data[i].location.longitude

//             fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ce36ea6b2c1bdfa3f088b12871d892ff`)
//             .then(res => res.json())
//             .then(data2 => {
//                 let kalVersion = data2.main.temp
//                 let conversionTemp = 1.8*(kalVersion-273) + 32

//                 lI.innerText = `Facility: ${data[i].facility} | Location: ${lat}, ${lon} | Weather: ${Math.floor(conversionTemp)}`
//             })
//         }

//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     })
// }

// nasaFacilityLocationWeather()
