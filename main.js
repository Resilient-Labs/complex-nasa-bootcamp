fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach((element) => {
      document.querySelector("#result").innerHTML += `<div class="table">
      <span>${element.facility}</span>
      <span class="middle">${element.city}, ${element.state}</span>
      <span><button id="btn" data-zip=${element.zipcode} >Get Weather</button></span>
    </div>`;
    });

    document.querySelectorAll("#btn").forEach((btn) => {
      btn.addEventListener("click", getWeather);
    });
  });

function getWeather(e) {
  let zipcode = e.target.getAttribute("data-zip");
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=4e3de7235f22435180c150018230504&q=${zipcode}`
  )
    .then((res) => res.json())
    .then((data) => {
      e.target.innerHTML = data.current.condition.text;
    });
}
