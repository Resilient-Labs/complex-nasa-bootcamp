const api_key = config.MY_KEY

const getData = () => {
  const nasaApi = "https://data.nasa.gov/resource/gvk9-iz74";
  fetch(nasaApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.url);
      console.log(data);
      data.forEach((element, i) => {
        let li = document.createElement("li");
        let p = document.createElement("p");
        p.className = "weather";
        li.innerHTML = `${data[i].center}, ${data[i].facility}, ${data[i].city}, ${data[i].state}. ${data[i].zipcode}`;
        li.appendChild(p);
        document.querySelector("ol").appendChild(li); 
        let weather = `https://api.openweathermap.org/data/2.5/weather?q=${data[i].city},units=imperial&appid=${api_key}`;
        fetch(weather)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.main && data.main.temp) {
              p.innerHTML = `The Temperature is  ${data.main.temp}`;
            } else {
              p.innerHTML = "ALL YOUR WEATHER DATA ARE BELONG TO US";
            }
          });
      });
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
};

document.querySelector("button").addEventListener("click", getData);

