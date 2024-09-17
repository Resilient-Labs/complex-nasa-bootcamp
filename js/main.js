document.querySelector('.getAllLocations').addEventListener('click',grabFacilities)

function grabFacilities() {
    fetch('https://data.nasa.gov/resource/gvk9-iz74.json')

    .then(res => res.json())

    .then(data => {
        for(let i = 0; i < data.length;i++ ){
            let latitude = data[i].location.latitude
            let longitude = data[i].location.longitude 
            let city = data[i].city
            let facility = data[i].facility
            let list = document.createElement('li')
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=982c564e93f71d6948033715344457e5`)
            .then(res => res.json())
            
            .then(data => {
            let temperatue = Math.floor((data.main.temp - 273.15) * 9/5 + 32) 
            
            list.innerHTML = `<p>In ${facility},${city} it is ${temperatue} degrees.</p>`
            document.querySelector('.result').appendChild(list)
            })
            }
        })
}