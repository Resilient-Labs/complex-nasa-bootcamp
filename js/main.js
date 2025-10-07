//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
//get api key
//get date
//get user input in a varibale


//fetch request from api
//send api key and date to nasa
//willl get response from nasa -> object
//process the response json object, needs to be an json object
//do a task with response (facilty, location, weather)
//display name of facilty, location, weather.

//https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json
//https://api.openweathermap.org/data/2.5/weather


document.querySelector('button').addEventListener('click', getLocation)

function getLocation() {
    
    const url = `https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            //some help with michael k 
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
            const randomFacility = data[Math.floor(Math.random() * data.length)];

            document.querySelector('.center').innerText = randomFacility.center
            document.querySelector('.location').innerText = randomFacility.city

            getWeather(randomFacility.city)
        })

        .catch(err => {
            console.log(`error ${err}`)
        });

}

function getWeather(city) {

    const apikey = "b6be0c6025dbeadaf97eead3cf2af068"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {



            console.log(data)
            //help with Michael K for kelvins to farenheit Temp conversion
            const kelvin = data.main.temp;
            const celsius = kelvin - 273.15;
            let fahrenheit = (celsius * 9 / 5) + 32;
            document.querySelector('h4').innerText = fahrenheit.toFixed(0)

        })

        .catch(err => {
            console.log(`error ${err}`)
        });

}





