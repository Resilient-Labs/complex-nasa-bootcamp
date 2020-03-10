//Created with House Gardener
const ul = document.getElementById('facilityList');

document.querySelector("button").addEventListener("click", () => {
fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(res => res.json())
    .then(response => {
    response.forEach((objectData) => {
    const ul = document.getElementById('facilityList');
    let li = document.createElement('li');
    let zipValue = objectData.zipcode;

    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipValue},us&units=imperial&APPID=62e14fb430cf6b4be5cad32141764cf3`)
      .then(res => res.json())
      .then(weather => {
        li.innerHTML = (`${li.innerHTML} NASA Facility: ${objectData.facility} ${objectData.city} Temp: ${weather.main.temp}`);
        ul.appendChild(li);
      })
    })
  })
  .catch(err => {
    console.log(`error ${err}`)
    alert("sorry, there are no results for your search")
  });
})
