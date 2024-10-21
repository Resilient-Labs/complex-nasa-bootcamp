import { apiKey } from './apiKey.js';

document.addEventListener('DOMContentLoaded', (event) => {
  const url = `https://data.nasa.gov/resource/gvk9-iz74.json`;
  const facilities = document.querySelector('.facilities');

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const firstTen = data.slice(0, 10); 
      firstTen.forEach(async (loc) => {
        const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${loc.city}&aqi=no`;

        const weather = await fetchWeather(weatherUrl); 
        console.log('weather', weather); 
        
        const listItem = document.createElement('li');

        const img = document.createElement('img');
        img.src = weather.current.condition.icon; 
        
        listItem.textContent = `facility : ${loc.facility}, location: ${loc.city}, ${loc.state}, weather: ${weather.current.condition.text}`;
        listItem.appendChild(img); 
        facilities.appendChild(listItem);
      });
    });
});

function fetchWeather(url) {
  let weather;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log('data', data);
      weather = data;
      // console.log('weather in fetch', weather);
      return weather;
    });
  
  
}

