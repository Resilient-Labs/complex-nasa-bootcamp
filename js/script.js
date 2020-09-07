function getWeather(facility, name, country, lat, long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=777e5fb4df89e4b1f5244c3276cc5b9c&units=imperial`)
        .then(response => response.json())
        .then(weatherData =>{
            let newLi = document.createElement('li')
            let info = document.createTextNode(`The tempurature at | ${facility} | ${name} | ${country} is ${weatherData.main.temp} F`)
            newLi.appendChild(info)
            document.getElementById('facilities').appendChild(newLi)
        })
};

fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
    .then(response => response.json())
    .then(data => {
        data.forEach((nasaLocation, i) => {
            getWeather(nasaLocation.facility, nasaLocation.center, nasaLocation.country, nasaLocation.location.latitude, nasaLocation.location.longitude);
        })
    })
