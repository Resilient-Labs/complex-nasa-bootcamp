const selectButt = document.querySelector('button')
const showItems = document.querySelector('#list') 

function getLocation () {
    const url = `https://data.nasa.gov/resource/gvk9-iz74.json`

    fetch(url)
        .then(res => res.json()) 
        .then(facilitiesData => {
        console.log(facilitiesData) 

        const addToDom = (facility) => {
            const { latitude: lat, longitude: lon } = facility.location
            const { facility: addr, city, state } = facility 

            const listItem = document.createElement('li') 
            listItem.innerText = `${addr}, ${city}, ${state}` 

            const url2 =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=269e13939e739f108f23ed75ed83547b` 


            fetch (url2) 
            .then(res => res.json())
            .then(weatherData => {
                if (weatherData?.main?.temp) {
                let kelvin = weatherData.main.temp 
                let f = (kelvin - 273.15)* 1.8 + 32 
                const weather = document.createElement('li')
                weather.innerText = `The temperature is: ${Math.floor(f)}`
                listItem.innerText += `The temperature is ${Math.floor(f)}`
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