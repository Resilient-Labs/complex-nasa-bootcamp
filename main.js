document.querySelector('button').addEventListener('click', getData)
// document.querySelector('button').addEventListener('click', getWeather)


function getData() {
    
    const url = "https://data.nasa.gov/resource/gvk9-iz74.json"
    
    fetch(url)
        .then(response => response.json())
        .then(facilities => {
            console.log(facilities)
            
            for( let i = 0; i <= 10; i++){
                const column = document.createElement('tr')
                column.innerHTML = `<td>${name}</td>`
        
            }

            document.querySelector('.facility').innertext = facilities.
           
            
            facilities.forEach(facility => {
                const { name, location, latitude, longitude } = facility
                // 
                getData(latitude, longitude, facilityContainer, name, location)
            });
        })
        // .catch(error => {
        //     console.error("Error fetching facilities:", error);
        // });
}


function getWeather(container, facilityName, facilityLocation) {

    const key = "c41abeabbbf7caca12940de78379c528"
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    
    fetch(weatherUrl)
        .then(response => response.json())
        .then(weatherData => {
            console.log(weatherData);

            
            const weather = weatherData.weather[0].description
            const temperature = weatherData.main.temp;
            
            // create new divs
            const facility = document.createElement('div')
            facility.classList.add('facility')
            
            facility.innerHTML = 
                `<h3>${facilityName}</h3>
                <p>Location: ${facilityLocation}</p>
                <p>Weather: ${weather}</p>
                <p>Temperature: ${temperature}°F</p>`
            container.appendChild(facility)
        })
        
}
