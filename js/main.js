let conditions = {
  "Sunny": "https://upload.wikimedia.org/wikipedia/commons/c/cd/SunnyDay019.jpg",
  "Partly cloudy": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Partly_cloudy_with_a_chance_of_rain_-_panoramio.jpg/1200px-Partly_cloudy_with_a_chance_of_rain_-_panoramio.jpg",
  "Cloudy": "https://upload.wikimedia.org/wikipedia/commons/7/71/Cloudy_weather.jpg",
  "Overcast": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Overcast_skies_from_Tropical_Storm_Danny.jpg",
  "Mist": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Foggy_Mountain_Weather_%28Unsplash%29.jpg",
  "Blowing snow": "https://upload.wikimedia.org/wikipedia/commons/6/61/Blowing_snow%2C_Creag_Mhigeachaidh_-_geograph.org.uk_-_318618.jpg",
  "Blizzard": "https://upload.wikimedia.org/wikipedia/commons/6/61/Blizzard3_-_NOAA.jpg",
  "Fog": "https://upload.wikimedia.org/wikipedia/en/3/33/Dense_Tule_fog_in_Bakersfield%2C_California.jpg",
  "Light drizzle": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Row_of_poplars_in_the_drizzle_-_geograph.org.uk_-_591822.jpg",
  "Light rain": "https://upload.wikimedia.org/wikipedia/commons/3/30/Fishing_in_light_rain_and_stillness_%288295647635%29.jpg",
  "Moderate rain": "https://upload.wikimedia.org/wikipedia/commons/3/30/Fishing_in_light_rain_and_stillness_%288295647635%29.jpg",
  "Heavy rain": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Heavy_Rain.jpg/640px-Heavy_Rain.jpg",
  "Light sleet": "https://upload.wikimedia.org/wikipedia/commons/c/cf/2013-02-23_03_59_28_Graupel_%28snow_pellets%29_in_Elko%2C_Nevada.JPG",
  "Light snow": "https://upload.wikimedia.org/wikipedia/commons/9/9e/D%C3%BCsseldorf_Hofgarten_2009.jpg",
  "Moderate snow": "https://upload.wikimedia.org/wikipedia/commons/9/9e/D%C3%BCsseldorf_Hofgarten_2009.jpg",
  "Heavy snow": "https://png.pngtree.com/thumb_back/fh260/background/20220711/pngtree-the-road-496-is-blanketed-in-heavy-snow-amidst-unfavorable-weather-conditions-photo-image_32657340.jpg",
  "Ice pellets": "https://upload.wikimedia.org/wikipedia/commons/0/0f/2019-02-20_10_52_19_Sleet_%28ice_pellets%29_on_a_car_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg",
  "Light rain shower": "https://upload.wikimedia.org/wikipedia/commons/c/cf/Averse_en_Haute-Savoie.JPG",
  "default": '../img/sky.jpg'
}

fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(location => {
      const locationClasses = ['space1', 'space2', 'space3', 'space4', 'space5', 'space6'];
      const randomClass = locationClasses[Math.floor(Math.random() * locationClasses.length)];
      document.querySelector('.locations').innerHTML += `
        <div class="location ${randomClass}" key="${location.location.latitude},${location.location.longitude}">
          <h3>${location.facility}</h3>
          <h4>${location.center}</h4>
          <h5>${location.city}, ${location.state} ${location.country}</h5>
        </div>
      `
    });
    document.querySelectorAll('.location').forEach(location => {
      location.addEventListener('click', async (event) => {
        event.stopPropagation();
        const latLong = location.getAttribute('key');
        try {
          const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?q=${latLong}&key=3dbe885aba8446698ce144944252603`);
          const weather = await weatherResponse.json();

          const popoverTag = popover.querySelector('div.pop');
          popoverTag.innerHTML = `
            <img src="${weather.current.condition.icon}" alt="${weather.current.condition.text}">
            <p class="weatherText">${weather.current.condition.text}</p>
            ${location.innerHTML}
            <h3>${weather.location.region}, ${weather.location.country}</h3>
            <h4>${Math.floor(weather.current.temp_f)}ºF | ${Math.floor(weather.current.temp_c)}ºC</h4>
            <h5>Feels like: ${Math.floor(weather.current.feelslike_f)}ºF | ${Math.floor(weather.current.feelslike_c)}ºC</h5>
            <h6>UV: ${weather.current.uv} | ${weather.current.uv > 10 ? 'Extreme, Take full precaution' : weather.current.uv > 7 ? 'Very High, Extra precaution required' : weather.current.uv > 5 ? 'High, Protection required' : weather.current.uv > 2 ? 'Moderate, Take precautions': 'Low, Minimal sun protection required'}</h6>
          `;
          popover.style.backgroundImage = `url(${conditions[weather.current.condition.text] || conditions.default})`;

          popover.style.display = 'block';
        } catch (err) {
          console.error('Error fetching weather data:', err);
        }
      });
    });
  })
  .catch(err => {
    console.error(err);
  });


const popover = document.createElement('div');
popover.classList.add('popover');
popover.innerHTML = `
  <button class="close-btn">Close</button>
  <div class="pop">
  </div>
`;
document.body.appendChild(popover);


popover.querySelector('.close-btn').addEventListener('click', () => {
  popover.style.display = 'none';
});
