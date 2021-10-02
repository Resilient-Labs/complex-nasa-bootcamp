nasaLocation()
function nasaLocation(){
    const url = 'https:data.nasa.gov/resource/gvk9-iz74.json'
fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(datafromArray => {
        datafromArray.city
        datafromArray.state
        console.log(datafromArray)
        for (let i = 0;i < datafromArray.length;i++){
            let row = document.createElement('tr')
            let weatherCell = document.createElement('td')
            console.log(datafromArray[i].city, datafromArray[i].state, datafromArray[i].center, datafromArray[i].zipcode)
            let fiveZip = datafromArray[i].zipcode.substring(0,5)
            const weather = `https://api.openweathermap.org/data/2.5/weather?zip=${fiveZip}&appid={[k]}=imperial`
            console.log(weather)
            fetch(weather)
                .then(res => res.json()) // parse response as JSON
                .then(datafromWeather => {
                    console.log(datafromWeather)
                    console.log(datafromArray[i].city, datafromArray[i].state, datafromArray[i].center, datafromArray[i].zipcode)
                    let weather = datafromWeather.main.temp
                    weatherCell.innerText = weather
                    row.appendChild(weatherCell)
                })
                .catch(err => {
                    console.log(`error ${err}`)
                });
                let facility = datafromArray[i].center
                let location = datafromArray[i].city
                let facilityCell=document.createElement('td')
                let locationCell=document.createElement('td')
                facilityCell.innerText = facility
                locationCell.innerText = location
                row.appendChild(facilityCell)
                row.appendChild(locationCell)
                document.querySelector('tbody').appendChild(row)
        }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}