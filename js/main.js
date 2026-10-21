//alert('works') 
/* 
//https://data-nasa-bucket-production.s3.us-east-1.amazonaws.com/legacy/gvk9-iz74.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZJ34W7PDDY5NI5UD%2F20260928%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260928T035125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLWVhc3QtMSJHMEUCIAjkiGhtap3jX%2FaHr00GYvlrP%2BRmwCXqb5bZMPNTkobUAiEA6YzmL6zFGQjEJVwSLRh1fFwaH4OcqBEkeMQj%2FoHgF2MqlgUILBAAGgw2Mzk2NzQ4MDkyODYiDHY9WmHin18rErWcoCrzBPmQBL5R2ep4nsQXTNIatX0%2FYGesnU%2F8UJTh%2FxskQ7NIkPTTTCMAps%2B77Ca2D9HiumRm4SNvFcIJd4vH2YeIBaHXa4IgqTXWXzdlJNrxkOkKyKZgxx%2BjoZjnqkWnseWEcDe4IVUhuq3ASgjt%2FyFZFrYt7sbyN6qd7VohEXc1QP0ck5SOuuMlgrzcioLMx%2BSQo7BfqqtoOJcgpz3S%2B34X6dbmey00vKkX%2BZwp1httJ0VJfGC%2FsKj2dmb8DxgfGlvwqwn3koIvaqBR23hHCN26xJErxdDNhs%2FJZ%2FceHNfEdVmabZwZ%2FwQ%2BUOeZeuUCrRe9YE%2FMbsBx2KpqMeJFUysb52nggL4igMjFusYyvXzzvQihV0AHGeqET8Vws3SGA3CJkI990Cea%2Fv514yluurxVHYQ129eDWrGr93szbN2mj2tJMdHt%2Bu%2BvF3cP1DJiI1iEY0XS%2FzuQehFOYDtWXKPup4KYRAUgE4%2FE5OwsECF9T7q9JZKKi0nPaenj8c6ZXEdiR9TtR2P0HvARzf6isJzats6qQUPuqLIiPvidvRPU2FcxRQMYMM%2FP9zL3Xy0lY8LS2kCj3QXgeO3tth5lTPjUToqxr8Rnz1I4rO1FmiwXWiILIZfIycBVKHjUUBsab5lu%2Bs8mAWb7rrCjv%2FXQugK%2Fq7riYb4PY%2Bq42apqv4WWHklA5YpwvfDUGoH%2B%2B9QeqDO9R%2Bj6S2TnXFohz25uR8fpxcO1L8LlJjouulQUWREJgiHmfPBqXFcy2G4ZoYYAi42Pv%2BESfhOI37m6C%2Bk%2FHtRIA0G9ir9v642TycO%2FpsMikCve%2BXsnEXDGNAHDFq2yTzsZk2x%2BFjCYvefVBjqZAWY84S8hsULkdHWq9M7BGFH%2Fm2YmT6uKIe%2F9I8q%2FPDICrQ8XlNfmVXdlkonQCZbAVs1HaeCWptgljTv62FzK78rjIET9uaRNCrCfr%2FCEJCZH50FKAIF4XWT5g6z7wihvD1zvpvtARGQbFJSi0e%2B1GUdz7gA3id80gZ1TtyBSMcu6SYDtKWvFNrphyBSaNEOnomqBhipZy05ddw%3D%3D&X-Amz-Signature=bcdcbf340b602aecdab92cd7fdb51aaf83a33a132c09092fb4420f656b5da886&X-Amz-SignedHeaders=host&x-id=GetObject

https://carto.nationalmap.gov/arcgis/help/en/rest/services-reference/enterprise/get-started-with-the-services-directory/
should it be loaded or do i need the person to press soemthing?
the page shows all of nasa locations
each location is a card 
he API shows 485 locations, should the array slice be (0,484?)
from each data nasa URl load Center, 
center, country, city, 
use the country and city or lat and long to laod the weathe rusing 
const apiUrl =`http://api.weatherapi.com/v1/current.json?key=388082f6b25c4169979213913262209&q=${fullPlace}&aqi=no`
the flow for getting the weather can be the same as the weather API?
    const apiUrl =`http://api.weatherapi.com/v1/current.json?key=388082f6b25c4169979213913262209&q=${fullPlace}&aqi=no`
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(`error${err}`)
        alert(`error${err}`)
        })    
}
//https://api.nasa.gov/
//https://github.com/nasa/api-docs 
//https://cors.io/
fetch('https://cors.io/?url=https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log('Status:', data.status);
    console.log('Body:', data.body);
  });
  Add ?url= or ?u= with the target URL:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
https://cors.io/?url=https://api.example.com/data
https://cors.io/?u=https://api.example.com/data
*/
//useencodeURIComponeent to turn the sasa utl to a safer format 

const nasaUrl = `https://cors.io/?url=${encodeURIComponent("https://data.nasa.gov/docs/legacy/gvk9-iz74.json")}`;
const output = document.querySelector("#output");

fetch(nasaUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
//cors giving error, need to make my data standrd  parse truning string to js
    const places = typeof data.body === "string" ? JSON.parse(data.body) : data.body || data;
    
//for each data point/ array of data get specific values into the card
    places.forEach(place => {
      const card = document.createElement("article");
      card.className = "card";

      const name = document.createElement("h2");
      name.textContent = `Facility name: ${place.facility}`;

      const center = document.createElement("p");
      center.textContent = `Center: ${place.center}`;

      const location = document.createElement("p");
      location.textContent = `Location: ${place.city}, ${place.state}, ${place.country}`;

      const weather = document.createElement("p");

      const latitude = place.location?.latitude;
      const longitude = place.location?.longitude;

      const fullPlace = `${latitude},${longitude}`;
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=388082f6b25c4169979213913262209&q=${fullPlace}&aqi=no`;

      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            throw new Error(data.error.message);
          }

          weather.textContent =
            `Weather: ${data.current.temp_f}°F, Current Condition: ${data.current.condition.text}`;
        })
        .catch(err => {
          console.error("Weather API error:", err);
        });


        card.append(name, center, location, weather);
        output.appendChild(card);
    });
  })
  .catch(err => console.error("NASA API error:", err));