//worked on with House Hayden: Rebecca, Kadeisha, Jeffrey, and Anastasia


function getWeather(facility, name, country, lat, long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d90ff8cf2b9f828e5633fd9ca45f0634&units=imperial`)
        .then(response => response.json())
        .then(weatherData =>{

            let newLi = document.createElement('li')
            let info = document.createTextNode(`The tempurature at ${facility}, ${name}, ${country} is ${weatherData.main.temp} F`)
            document.getElementsByTagName("body")[0].style.height = "auto";
            newLi.appendChild(info)
            document.getElementById('facilities').appendChild(newLi)
        })
};
function getNASAandWeather(){
    fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
        .then(response => response.json())
        .then(data => {
            console.log(data.length)
            data.forEach((nasaLocation, i) => {
                getWeather(nasaLocation.facility, nasaLocation.center, nasaLocation.country, nasaLocation.location.latitude, nasaLocation.location.longitude, i);
            })
        })

}

document.getElementById("button").onclick = getNASAandWeather
