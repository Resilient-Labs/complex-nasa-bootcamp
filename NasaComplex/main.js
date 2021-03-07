// worked with garderner gang  Asiana, Dashlin, Wade Brian, Julie Tanicia

document.querySelector("button").addEventListener("click", () => {
  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      console.log();
      response.forEach((obj) => {
        console.log(response);
        let city = obj.city;
        let facility = obj.center;
        let country = obj.country;
        let latitude = obj.location.latitude;
        let longitude = obj.location.longitude;
        const ol = document.querySelector("ol");
        const li = document.createElement("li");
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=aa205267bb003d594f7360d7ec43838a`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            let location = data.name;
            let weather = data.weather[0].main;
            li.innerHTML =
              li.innerHTML +
              facility +
              "is in" +
              city +
              "with a current temp of " +
              data.main.temp;
            ol.appendChild(li);
            document.querySelector("p").innerText = facility;
          })
          .catch((err) => {
            console.log("error" + err);
          })
          .catch((err) => {
            console.log("error" + err);
          });
      });
    });
});
