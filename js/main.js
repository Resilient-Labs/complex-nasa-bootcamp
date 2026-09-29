
fetch(`https://corsproxy.io/?key=4737317e&url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json?limit=50`)
        .then((res) => res.json()) // parse response as JSON
         //object
        .then((data) => {
            console.log(data)
           showFacility(data)
    })
    .catch(err => {
       console.log(`error ${err}`)
    });

//load facilities in the DOM without any event
function showFacility(listFacilities){
    let html='';
        listFacilities.forEach(facility =>{
            console.log(facility)
            console.log(facility.center)
            console.log(facility.city)
            html+=`<section class="facility-card">
                    <div><h5 class="title-description">Center:</h5><h5 class="description-facility">${facility.center}</h5></div>
                    <div><h5 class="title-description">Facility:</h5><h5 class="description-facility">${facility.facility}</h5></div>
                    <div><h5 class="title-description">City:</h5><h5 class="description-facility">${facility.city}</h5></div>
                    <div><h5 class="title-description">State:</h5><h5 class="description-facility">${facility.state}</h5></div>
                    <div><h5 class="title-description">Country:</h5><h5 class="description-facility">${facility.country}</h5></div>
                    <div><h5 class="title-description">Zip Code:</h5><h5 class="description-facility">${facility.zipcode}</h5></div>
                    <button type="button" name="button" class="view-weather" data-latitud="${facility.location.latitude}" data-longitud="${facility.location.longitude}">View Weather</button>
                    </section>`       
                })
       
                        
    document.querySelector('.container-facilities').innerHTML=html;
}

document.querySelector(".container-facilities").addEventListener('click',(e)=>{
    const btnViewWeather = e.target.closest('.view-weather');
    //const selectedProductName=document.getElementById(".selected-brand").value
    //console.log(`this is the selected brand${selectedProductName}`)
    if(!btnViewWeather){
        return alert("The current weather wasn't found")
    }else{

        getWeather(btnViewWeather.dataset.latitud,btnViewWeather.dataset.longitud);
        //getFDAInfo(btnSelect.dataset.brand)
    }
})


document.querySelector('.get-weather').onclick=getWeather;
function getWeather(latitud,longitud)
{
    fetch(`https://weather.googleapis.com/v1/currentConditions:lookup?key=AIzaSyD1TNvdfxmnS0NA6xyKznLxMDNpN1-v4hY&location.latitude=${latitud}&location.longitude=${longitud}`)
        .then((res) => res.json()) // parse response as JSON
         //object
        .then((data) => {
            console.log(data)   
            console.log(data.temperature.degrees)
            console.log(data.temperature.unit)
            console.log(data.weatherCondition.description.text)
            console.log(data.timeZone.id)
            console.log('que es')
            console.log(data.relativeHumidity)
            console.log(data.precipitation.probability.type)
            console.log(data.wind.speed.value)
            console.log(data.wind.speed.unit)
            console.log(data.visibility.distance)
            console.log(data.visibility.unit)
            console.log(data.feelsLikeTemperature.degrees)
            console.log(data.feelsLikeTemperature.unit)
            showCurrentWeather(data)

    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

function showCurrentWeather(weather)
{
    let html='';
        html+=`<section class="weather-details">
				<section class="temperature">
                    <h2 class="getValue">${weather.timeZone.id}</h2>
                 	<span class="material-symbols-outlined icon">partly_cloudy_day</span>
					<h2 class="getValue">${weather.temperature.degrees}</h2>
					<div class="switch"><div class="switch1">°F</div><div class="switch2">°${weather.temperature.unit}</div></div>
                    <h2 class="getValue">${weather.weatherCondition.description.text}</h2>
                </section>
				<section class="box-container">
					<section class="box"><div><span class="material-symbols-outlined icon">humidity_low</span><p class="description">HUMIDITY</p></div><h2 class="getValue">${weather.relativeHumidity} ${weather.precipitation.probability.type}</h2></section>
					<section class="box"><div><span class="material-symbols-outlined icon">air</span><p class="description">WIND SPEED</p></div><h2 class="getValue">${weather.wind.speed.value} ${weather.wind.speed.unit}</h2></section>
					<section class="box"><div><span class="material-symbols-outlined icon">visibility</span><p class="description">VISIBILITY</p></div><h2 class="getValue">${weather.visibility.distance} ${weather.visibility.unit}</h2></section>
					<section class="box"><div><span class="material-symbols-outlined icon">thermometer</span><p class="description">FEELS LIKE</p></div><h2 class="getValue">${weather.feelsLikeTemperature.degrees} ${weather.feelsLikeTemperature.unit}</h2></section>
				</section>
			</section>`
                        
    document.querySelector('.container-facilities').innerHTML=html;
}










