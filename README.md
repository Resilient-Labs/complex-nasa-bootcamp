
  ## Project: NASA's API 
  <img width="1920" alt="image" src="https://github.com/user-attachments/assets/75c006f5-30f3-467d-935f-633f6c763413" />

This JavaScript project is a web application that retrieves and displays information about various NASA facilities along with their local weather conditions. An event listener attached to a button triggers the getFacilities function, which first uses the fetch() API with a proxy to access a JSON dataset from data.nasa.gov. Upon successfully processing the list of facilities, the code iterates through the data; for each entry containing valid location coordinates (latitude and longitude), it performs a second, nested fetch() call to the OpenWeatherMap API to retrieve the current temperature and weather description for that specific location. Finally, the application dynamically creates and appends div elements to the webpage, displaying the facility's name, location, and the latest weather information.


### Tech Stack
- HTML

- CSS
  
- JavaScript

### Live Demo
Click the link on the right under About to see the live demo.
