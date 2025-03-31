// attempt 4
document.querySelector('button').addEventListener('click', findNasa);

function findNasa() {
    let urlNasa = "https://data.nasa.gov/resource/gvk9-iz74.json";

    fetch(urlNasa)
        .then(res => res.json())//parse json
        .then(facilities => {
            console.log("NASA Data:", facilities);

            const facilityList = document.getElementById('facilityList');
            facilityList.innerHTML = ""; // Clear the inside html

            facilities.slice(0, 485).forEach(facility => { // Test with 5 first, since 485 is so many locations, gotta be careful w using up too many api requests
                let name = facility.facility;
                let location = `${facility.city}, ${facility.state}, ${facility.country}`;
                let latit = parseFloat(facility.location?.latitude);
                let longit = parseFloat(facility.location?.longitude);
                //get longitude n latitudes from location nest


                console.log("Facility Data:", facility); 

                if (latit && longit) {
                    getWeather(name, location, latit, longit);
                } else {
                    let li = document.createElement('li');
                    li.innerHTML = `${name} - ${location} <br> No Coordinates Found`;
                    facilityList.appendChild(li);
                }
            });
        })
        .catch(err => {
            console.error(`Error: ${err}`);
            alert('Error. Try again?');
        });
}

function getWeather(name, location, latit, longit) {
    const apiKey = "5a12d4d8b6a6994b6a522025fc56c1ed";
    const urlWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${longit}&appid=${apiKey}&units=metric`;

fetch(urlWeatherApi)
    .then(res => res.json())
    .then(weatherData => {
        
        let temp = weatherData.main?.temp ?? "N/A";
        let condition = weatherData.weather?.[0]?.description ?? "No data";

        let li = document.createElement('li');
        li.innerHTML = `${name} - ${location}, ... 
            TEMPERATURE: ${temp} Degrees in Celsius ... CONDITION: ${condition}`;
        document.getElementById('facilityList').appendChild(li);
    })
    .catch(err => {
        console.error(`Error: ${err}`);
        let li = document.createElement('li');
        li.innerHTML = `${name} - ${location}, Sorry Weather Not Found`;
        document.getElementById('facilityList').appendChild(li);
    });
}
