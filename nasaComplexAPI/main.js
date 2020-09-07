let result = document.querySelector("#result");
fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
  .then((response) => response.json())
  .then((data) => {
    result.innerHTML = `
      ${data
        .map(
          (facility, index) => `
      
          <tr>
          <td id="left">${index+1}</td>

          <td id="left">${facility.facility}</td>
          <td id="middle">${facility.city},${facility.state}</td>
           <td id="right"><button id="getWeatherBtn" data-lat="${facility.location.latitude}" data-lon="${facility.location.longitude}"> Get Weather</button></td>
          </tr>
      `
        )
        .join("")}
  `;
    result.addEventListener("click", (e) => {
      let clickedElement = e.target;
      if (clickedElement.tagName === "BUTTON") {
        let latitude = clickedElement.getAttribute("data-lat");
        let longitude = clickedElement.getAttribute("data-lon");
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=003bd0423f8f627a496637434f9231df&units=imperial`
          )
          .then((response) => response.json())

          .then((data) => {
            clickedElement.innerHTML = data["weather"]["0"]["description"];
          })
          .catch((err) => console.log(err));
      }
      clickedElement.classList.add("change");
    });
  });