// function to retrieve NASA data and display weather information
function runStats() {
    // url 
    let url = 'https://data.nasa.gov/resource/gvk9-iz74.json';

    // fetch 
    fetch(url)
        .then(res => res.json()) // parse the response as JSON
        .then(data => {
            let zipCode = '';

            for (let i = 0; i < data.length; i++) {
                let center = data[i].center;
                let city = data[i].city;
                let state = data[i].state;
                zipCode = data[i].zipcode;

                // weather api url
                let weatherUrl = `http://api.weatherapi.com/v1/current.json?key=f16a6e44f6494fa4baa175942230504&q=${zipCode}`;

                // fetch weather data
                fetch(weatherUrl)
                    .then(res => res.json()) 
                    .then(weatherData => {
                        let temp = weatherData.current.temp_f;
                        
                        // create a list item with the combined information
                        let centerNameItem = document.createElement('li');
                        centerNameItem.innerText = center + ', ' + city + ', ' + state + ', ' + temp;
                        
                        document.querySelector('ul').appendChild(centerNameItem);
                    })
                    .catch(err => {
                        console.log(`error ${err}`);
                    });
            }
        })
        .catch(err => {
            console.log(`error ${err}`);
        });
}

// call the runStats function to start the process
runStats();
