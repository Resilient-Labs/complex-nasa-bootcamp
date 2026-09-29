//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&forecast_days=1

document.querySelector('button').addEventListener('click', tempWeather)

function tempWeather() {
    const inputOne = document.querySelector('#latitude').value
    const inputTwo = document.querySelector('#longitude').value

    const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=apparent_temperature&current=apparent_temperature&forecast_days=1&temperature_unit=fahrenheit`

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
        })

}
