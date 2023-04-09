const selectButt = document.querySelector('button')
const showItems = document.querySelector('#list')

function getLocation() {
    const url = 'https://data.nasa.gov/resource/gvk9-iz74.json'

    fetch(url)
        .then(res => res.json())
        .then(facilitiesData => {
            console.log(facilitiesData)

            const addToDom = (facility) => {
                const { latitude: lat, longitude: lon } = facility.location
                const { facility: addr, city, state } = facility

                const listItem = document.createElement('li')
                listItem.innerText = `Facility: ${addr}, Location: ${city}, ${state}`

                const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=07fe80d40a95e2d66ff9ab781f83fe0c`

                fetch(url2)
                    .then(res => res.json())
                    .then(weatherData => {
                        if (weatherData?.main?.temp) /* This is a compact if/else. If truthy, then the condition of the if statement is considered true and the code inside the if block will be executed. If it is falsy, then the condition of the if statement is considered false and the code inside the if block will not be executed.*/ {
                            let kelvin = weatherData.main.temp
                            let f = (kelvin - 273.15) * 1.8 + 32
                            const weather = document.createElement('li')
                            weather.innerText = `, and the temperature is: ${Math.floor(f)}`
                            listItem.innerText += `, and the temperature is: ${Math.floor(f)}`
                        }
                    })
                    showItems.appendChild(listItem)
                    console.log(showItems)
            }
            facilitiesData.forEach(addToDom)
        })
        .catch(error => console.error('Error:', error))
}

selectButt.addEventListener('click', getLocation)
