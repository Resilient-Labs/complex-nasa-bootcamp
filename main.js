
//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

document.querySelector('button').addEventListener('click', nasaButton)

function nasaButton() {

    fetch('https://data.nasa.gov/resource/gvk9-iz74')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
    // console.log(data)
    let main = document.querySelector('main')
        for(let i = 0; i <= data.length; i++ ) {
            const nasaLat = data[i].location.latitude
            const nasaLon = data[i].location.longitude
            const nasaFacility = data[i].facility

            const urlTemp = `https://api.openweathermap.org/data/2.5/weather?lat=${nasaLat}&lon=${nasaLon}&appid=f4221edf930e3945b38a5e8c64554341`
            
            fetch(urlTemp)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    const f = Math.round(1.8 * ((data.main.temp) -273.15) + 32)
                    const nasaLocation = data.name
                    const nasaWeather = data.weather[0].description
                    
                    const ul = document.createElement('ul')
                    const li = document.createElement('li')
                    const ol = document.createElement('ol')

                    li.innerText = `Weather: ${nasaWeather}, Temp: ${f}`
                    ol.innerText = `Location: ${nasaLocation} ${nasaLat}, ${nasaLon}`
                    ul.innerText = `Facility: ${nasaFacility}`
                    
                    
                    main.appendChild(ul)
                    ul.appendChild(li)
                    ul.appendChild(ol)
                })
                .catch(err => {
                    console.log(`error ${err}`)
                });
        }
    })
    .catch(err => {
    console.log(`error ${err}`)
    });
}
