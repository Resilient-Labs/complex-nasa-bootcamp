# complex-api-nasa

This is NASA centered app. It returns the current temperature at each of NASA's facilities. 

Link to Project: https://nasa-location-temp-api.netlify.app/

![Project Image](/pic/nasa.png)


### How It's Made:

Tech used: HTML, CSS, JavaScript

This NASA app uses 2 APIs: 1) a NASA API (nasa.gov) and 2) a weather API (openweather). The app will return: 1) the NASA facility name, 2) the NASA facility location, and 3) the current temperate at the location. 

Ex. FACILITY NAME: Jet Propulsion Lab LOCATION: PASADENA, CA, US, 91109 TEMPERATURE: 57.15

To get this data, I looped through the NASA API to return the facility name and the facility location (city, state, country, and zip code). Next, the zip code is sent to the weather API to get its current temperate. 

name, location -> current temperature


### Lesson Learned

I learned how to use 2 APIs in an app. I did this by writing a fetch statement and nesting another fetch statement inside of it. Moreover, I learned how to loop through an API to get the data I wanted and how to use the append() method to create list elements dynamically in JavaScript. 
 

###