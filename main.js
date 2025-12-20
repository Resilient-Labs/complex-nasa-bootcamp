
//Use NASA's API to return all of their facility locations (~400). 
// Display the name of the facility, its location, and the weather at the facility currently.
//psuedo code
//get my two apis
//create my event listener
//make a function to fetch facility locations 
//create my catch for errors
//create my second function with my second api 
//the second one needs to return th weather of the first api picked location 
//call my second function inside the first one 
//remember to log my code each time to make sure it works so I can know the error early on and fix it
//got help from google and marquis








document.querySelector('button').addEventListener('click', getFacilities);

const nasaFacilities = document.querySelector('#facilities');

function getFacilities() {
    fetch('https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json')
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            //used a loop to get the facilities

            for (let i = 0; i < data.length; i++) {
                let facility = data[i];
                let facilityName = facility.facility;
                let center = facility.center;
                let city = facility.city;
                let state = facility.state;
                let location = facility.location;


                //a conditional to display facility name city state and center

                if (facilityName && location && location.latitude && location.longitude) {
                    const div = document.createElement('div');
                    div.textContent = `${facilityName} — ${city}, ${state} (${center})`;

                    const lat = location.latitude;
                    const lon = location.longitude;

                    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=b8378d258bd03b79a5bda78a7784e773`;
                    //our fetch will grab facility and show its temp
                    fetch(weatherURL)
                        .then((res) => res.json())
                        .then((weatherData) => {
                            const temp = weatherData.main?.temp;
                            const desc = weatherData.weather && weatherData.weather[0] && weatherData.weather[0].description;

                            if (temp && desc) {
                                div.textContent += ` — Weather: ${temp}°F, ${desc}`;
                            } else {
                                div.textContent += ' — Weather data unavailable';
                            }
                        })
                        .catch((err) => {
                            console.error('Weather error:', err);
                            div.textContent += ' — Weather error';
                        });

                    nasaFacilities.appendChild(div);
                }
            }
        })
        .catch((err) => console.error('NASA facilities error:', err));
}




