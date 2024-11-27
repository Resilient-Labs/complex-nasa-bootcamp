document.addEventListener('DOMContentLoaded', function() {
    const url="https://data.nasa.gov/resource/gvk9-iz74.json"
  fetch(url)
   .then(response => response.json())
   .then(data1 => {
    console.log(data1)

      const facilityArray= data1.forEach(element =>{ //loop to display all facilities in array
           element.facility
           element.city;
           element.state;
           element.zipcode;
           element.location.latitude ;
           element.location.longitude;
   
           let lat=element.location.latitude
           let lon=element.location.longitude
   
           fetch(`https://api.weatherapi.com/v1/forecast.json?key=e04962555dfb41ddba0150857241710&q=${lat} ${lon}&days=1&aqi=no&alerts=yes`)
   
           .then(response => response.json())
            .then(data2 => {
             console.log(data2);
             document.querySelector('ul').innerHTML += `<li>Facility Name: ${element.facility}, State: ${element.state}, City: ${element.city}, Zipcode: ${element.zipcode}, Temp: ${data2.current.temp_f}°F</li>`

             console.log(data2.current.temp_f)
            }) 
       });
   
    })
    

    .catch(error => {
    console.error('Error fetching the data:', error);
   });
});


