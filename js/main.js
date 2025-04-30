// https://openweathermap.org/current
let getInfo = document.querySelector('button').addEventListener('click', getTemperature)
function getTemperature() {
    fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            for(let i = 0; i <= data.length; i++ ){
                const col = document.createElement('tr')
                col.innerHTML = `<td>${data[i].city}</td>
                <td>${data[i].center}</td>`
                document.querySelector('table').appendChild(col)
                let lat = data[i].location.latitude
                let lon = data[i].location.longitude
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=[your_key]&units=imperial`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        col.innerHTML = col.innerHTML + `<td>${data.main.temp} F</td>`
                    })
                  
            }
            })
                .catch(err => {
                    console.log(`error ${err}`)
                })
        
}
