let url = 'https://data.nasa.gov/resource/gvk9-iz74.json'
let nasaSites = []
document.querySelector('button').addEventListener('click',renderFunc)
fetch(url)
.then((res) => res.json())
.then((data) =>{
    data.map(x => {
        nasaSites.push({
            city: x.city,
            state: x.state,
            zip: x.zipcode
        })
    })
    nasaSiteWithWeather()
})

function nasaSiteWithWeather(){
     nasaSites.forEach(x => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=f67b3d6a11654194a2c151527230504&q=${x.zip}&aqi=no`)
        .then((res) => res.json())
        .then((data) => {
            x.weather = data.current.condition.text
            x.temp = data.current.temp_f
            x.icon = data.current.condition.icon
        })
    })
    return nasaSites
}

function renderFunc(){
    nasaSites.forEach((x) => {
        let html = `
        <div class="weather_card">
            <p>${x.city}, ${x.state}</p>
            <img src="${x.icon}">
            <span>${x.temp} &degF</span>
            <span>${x.weather}</span>
        </div>
    `
    document.querySelector('section').innerHTML += html
    })
}
