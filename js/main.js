
document.querySelector("#search-button").addEventListener('click', searchFacility);

function searchFacility() {
    let facility = document.querySelector("#facility-input").value;
    
    fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            
            for (let i = 0; i < data.length; i++) {
                if (facility === data[i].facility) {
                    console.log(data[i].facility);
                    console.log('Working');
                    checkWeather(data[i].location.latitude, data[i].location.longitude);
                    document.querySelector("#facility-name").innerHTML = data[i].facility;
                    document.querySelector("#facility-input").value = '';
                }
            }
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].facility);
                }
            }
        )
        .catch(error => {
            console.log(`error ${error}`)
        })
}



function checkWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=APIKEY&units=imperial`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector("#temperature").innerHTML = data.main.temp;
            document.querySelector("#humidity-level").innerHTML = data.main.humidity;
            document.querySelector("#cloudiness").innerHTML = data.clouds.all;
            document.querySelector("#wind-speed").innerHTML = data.wind.speed;
        })
        .catch(error => {
            console.log(`error ${error}`)
        })
}
