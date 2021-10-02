
const urlLocations = `https://data.nasa.gov/resource/gvk9-iz74.json`


fetch(urlLocations)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        console.log(data[15])
        for (let i = 0; i < data.length; i++) {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.className = 'weather';

            li.innerText = `
                ${data[i].center}
                ${data[i].facility}
                ${data[i].city}, ${data[i].state}. ${data[i].zipcode}
            `
            li.appendChild(span)
            document.querySelector('ol').appendChild(li);

            const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${data[i].city}&units=imperial&appid=KEY`

            fetch(urlWeather)
                .then(res => res.json())
                .then(data => {
                    if (!data.main.temp) {
                        return span.innerText = "No Weather Data"
                    }

                    span.innerText = `Temp: ${data.main.temp}`
                })

                .catch(err => {
                    console.log(`error ${err}`)
                });
        }


    })
    .catch(err => {
        console.log(`error ${err}`)
    });





/*Project Reflections

*/