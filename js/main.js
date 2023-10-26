
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
                fetch(`https://api.weatherapi.com/v1/current.json?key=0834971ddb924ff6a0323327232610&q=${latitude},${longitude}`) 
                    .then(response => response.json())
                    .then(weatherData => {
                        console.log(weatherData)
                        if (weatherData.current && weatherData.current.temp_c && weatherData.current.condition && weatherData.current.condition.text) { //checking to see if these objects and descriptions exist
                            const temperature = weatherData.current.temp_c;
                            const description = weatherData.current.condition.text;
                            weatherCell.textContent = `${description}, ${temperature}°C`; 
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

// weatherData.current: This checks if the current property exists on the weatherData object.

// weatherData.current.temp_c: If current exists, this checks if temp_c (temperature in Celsius) exists on the current object.

// weatherData.current.condition: If temp_c exists, this checks if the condition object exists on the current object.

// weatherData.current.condition.text: If condition exists, this checks if the text property (which holds the weather description) exists on the condition obj