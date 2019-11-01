const kelvinToFahrenheit = (k) => { return (k) * (9/5) - 459.67; }
const nasaLocations = document.querySelector("#nasaLocations");

document.querySelector('#displayWeather').addEventListener('click', facilities);

function facilities(){

    document.querySelectorAll(".nasaLocation").forEach(el => {
        el.parentNode.removeChild(el);
    })

    fetch(`https://data.nasa.gov/api/views/gvk9-iz74/rows.json?api_key=${nasaApiKey}`)
        .then(res => res.json())
        .then(response => {
            console.table(response);
            let stopRequesting = false;
            response.data.forEach( info => {
                if(!stopRequesting) {
                    const lat = info[20][1];
                    const lon = info[20][2];
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`)
                        .then(res2 => res2.json())
                        .then(response2 => {
                            const newListItem = document.createElement("li");
                            newListItem.classList.add("nasaLocation");
                            newListItem.appendChild(document.createTextNode(`The temperature at The ${info[8]} right now is ${Math.round(kelvinToFahrenheit(response2.main.temp))}° F.`));
                            nasaLocations.appendChild(newListItem);
                        })
                        .catch(err2 => {
                            console.log(err2);
                            console.table(err2);
                            console.log(err2.status)
                            if(err2.status === 429) {
                                stopRequesting = true;
                                console.log("The maximum number of requests has been made, preventing use of this application at the time.");
                            } else {
                                console.log(`There was an error either on your end or OpenWeatherMap's end: ${err2}`);
                            }
                        });
                }
            })
        })
        .catch(err => alert(`There was an error either on your end or NASA's end: ${err}`));
}