const getElement = (facility, weatherData) => {
    const newElement = document.createElement('div')
    newElement.setAttribute('class', 'facilityContainer');
    newElement.innerHTML = `
        <div class="tempInfo">
            <div class="tempTop">
                <img class="thermostatImage" src="img/thermostatWhite.png" alt="">
                <span class="tempValue">${weatherData && weatherData.current_condition[0].temp_F}</span>
                <span class="tempSymbol">°F</span>
            </div>
            <span class="tempText">${weatherData && weatherData.current_condition[0].weatherDesc[0].value}</span>
        </div>
        <div class="facilityInfo">
            <h6 class="facilityCenter">${facility.center}</h6>
            <span class="facilityName">${facility.facility}</span>
            <div class="locationInfo">
                <img class="locationSymbol" src="img/locationWhite.png" alt="">
                <div class="locationTextWrapper">
                    <span class="locationCity">${facility.city},</span>
                    <span class="locationState">${facility.state}-${facility.country}</span>
                </div>
                
            </div>
            <div class="facilityFoundingInfo">
                <img class="bagSymbol" src="img/bagWhite.png" alt="">
                <div>
                    <span class="facilityFoundingSince">Since ${facility.occupied && facility.occupied.split('-')[0]}</span>
                </div>
            </div>
        </div>
    `
    return newElement
}
    
const appendElement = (facility, weatherData) => document.querySelector('main').append(getElement(facility, weatherData))



async function getNasaFacilities() {
    try {
        const res = await fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`);
        const facilityList = await res.json();

        for (const facility of facilityList) {
            try {
                const weatherRes = await fetch(`https://wttr.in/${facility.city.replace(' ', '%20')}?format=j1`);
                const weatherData = await weatherRes.json();

                // I want to validate explicitly, just in case the weather data is not available
                if (weatherData.current_condition && weatherData.current_condition.length > 0) {
                    appendElement(facility, weatherData);
                } else {
                    console.warn('Invalid weather data:', weatherData);
                    appendElement(facility, 'N/A', 'Weather data unavailable');
                }
            } catch (weatherErr) {
                console.error('Weather fetch error:', weatherErr);
                appendElement(facility, 'N/A', 'Error retrieving weather');
            }
        }
    } catch (err) {
        console.error('Facility fetch error:', err);
    }
}


getNasaFacilities()

// fetch("https://wttr.in/Kennedy%20Space%20Center?format=j1")
//     .then( res => res.json())
//     .then( weatherData => console.log(weatherData.current_condition[0].temp_F))
//     .catch(err => console.log(err))