
document.addEventListener('DOMContentLoaded', function() {
    const facilitiesList = document.getElementById('facilitiesList')

    fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(facility => {
                const row = document.createElement('tr')
                const nameCell = document.createElement('td')
                const cityCell = document.createElement('td')
                const stateCell = document.createElement('td')
                const weatherCell = document.createElement('td')

                // Grab facility name, city, and state
                nameCell.textContent = facility.center 
                cityCell.textContent = facility.city 
                stateCell.textContent = facility.state

                // Get latitude and longitude from the facility location
                const latitude = facility.location.latitude 
                const longitude = facility.location.longitude 

                // Fetch weather data based on latitude and longitude
                fetch(`https://api.weatherapi.com/v1/current.json?key=b19bd926788146399f7232525232210=${latitude},${longitude}`)
                    .then(response => response.json())
                    .then(weatherData => {
                        // Check if required properties exist in the response
                        if (weatherData.current && weatherData.current.temperature && weatherData.current.weather_descriptions) {
                            const temperature = weatherData.current.temperature
                            const description = weatherData.current.weather_descriptions[0]
                            weatherCell.textContent = `${description}, ${temperature}°C` 
                        } else {
                            weatherCell.textContent = 'Data not available'
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching weather data:', error)
                        weatherCell.textContent = 'N/A'
                    }) 

                row.appendChild(nameCell)
                row.appendChild(cityCell)
                row.appendChild(stateCell)
                row.appendChild(weatherCell)
                facilitiesList.appendChild(row)
            })
        })
        .catch(error => {
            console.error('Error fetching NASA facilities:', error)
        }) 
}) 

