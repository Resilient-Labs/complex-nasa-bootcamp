// document.querySelector('button').addEventListener('click', getDrink);
let key = process.env.APIKEY;

function getFacility() {
    const url = `https://data.nasa.gov/resource/gvk9-iz74.json`

    fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        for(let i=0; i<data.length;i++) {
            let li = document.createElement('li');
            // li.innerHTML = data[i].center;
            let ul = document.querySelector('ul');
            ul.appendChild(li) 
            // console.log(data[i])
            let lat = data[i].location.latitude;
            let long = data[i].location.longitude;
            let url2 = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&q=${lat},${long}`
            fetch(url2)
            .then(res => res.json())
            .then(data2 => {
                fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${data2.Key}?apikey=${key}`)
                .then(res => res.json())
                .then(data3 => {
                    li.innerHTML = `Center: ${data[i].center}. Temperature: ${data3.DailyForecasts[0].Temperature.Maximum.Value} Degrees Fahrenheit. City: ${data[i].city}. State: ${data[i].state}. `
                    // console.log(data3.DailyForecasts[0].Temperature.Maximum.Value)
                })
                // console.log(data2.Key)
            })
        }
    
    })
    .catch(err => {
        console.log(`error ${res.error}`)
    })
}
getFacility()