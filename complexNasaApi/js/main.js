//House Gardner worked on this project as a group

const ul = document.getElementById('facilityList');

document.querySelector("button").addEventListener("click", () => {
fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(res => res.json())
    .then(response => {
    response.forEach((objectData) => {
    const ul = document.getElementById('facilityList');
    let li = document.createElement('li');
    let zipValue = objectData.zipcode

    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipValue},us&APPID=d218eddcd1e60fb3ac910f956a8e089c`)
      .then(res => res.json())
      .then(weather => {
        let fahrenheit = Math.floor((weather.main.temp - 273.15) * 1.8 + 32) + "F" + "°";

        li.innerHTML = li.innerHTML + objectData.facility + " " + objectData.city + " " + fahrenheit

        ul.appendChild(li);
      })

      .catch(err => {
        console.log(`error ${err}`)
        //alert("sorry, there are no results for your search")
      });
    })
  })
})
