document.querySelector('button').addEventListener('click', fetchFacility) 

function fetchFacility() {
    const nasaApi = 'https://data.nasa.gov/resource/gvk9-iz74.json'
    let resultsUl = document.querySelector('.results-ul');
    console.log(nasaApi)
    fetch(nasaApi)
        .then(response => response.json())

        .then(data => {
        
        for(let i = 0; i < data.length; i++){
            const listSection = document.createElement('section');
            listSection.classList.add('list-section')
            resultsUl.appendChild(listSection)

            const listLi = document.createElement('li');
            const listLii = document.createElement('li');
            const listLiii = document.createElement('li');
        
            listLi.innerText = data[i].center
            listLii.innerText = data[i].city 
            listLiii.innerText = data[i].state

            listLi.classList.add('list-li');
            listLii.classList.add('list-li');
            listLiii.classList.add('list-li');

            listSection.appendChild(listLi);
            listSection.appendChild(listLii);
            listSection.appendChild(listLiii);
            
            const latitude = data[i].location.latitude
            const longitude = + data[i].location.longitude
            const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=imperial`
            fetch(weatherApi)
                .then(response => response.json())

                .then(weatherData => {
                    console.log(weatherData)
                    const listLiiii = document.createElement('li');
                    listLiiii.innerText ='CURRENT TEMPERATURE: ' + weatherData.main.temp + ' F°'
                    listLiiii.classList.add('list-li');
                    listSection.appendChild(listLiiii);
                }) 

                .catch(error => {
                    console.log(`Error ${error}`)
                })
        }
        })  
        .catch(error => {
        console.log(`Error ${error}`)
        })
}





// Temp: '+weatherData.main.temp