# 🚀 Project: Complex NASA API

<img width="1445" alt="Screenshot 2023-10-22 at 11 16 08 AM" src="https://github.com/codedbycass/complex-nasa-api/assets/122684139/16b3c280-7ab1-4278-abfe-8fcd28affc2c">

## How it's made
I used HTML, CSS, JS.

To complete fulfil the requirements of this project which are to gather all of NASA facilities' locations and report the temperature, I used two API's. One API that had a list of all of NASA's locations and another API that had the ability to access current weather data for any location.

Once I gathered my API's, I tested each one individually to ensure that they work. To test, I accessed the NASA API's array (index of 485 for each location). I opened each index to read through the key/value pairs and took note of any key/values that indicated a specific location that could be used to feed into the weather API (zip code, city, state, longitude, and latitude). With the weather API, I noticed the url accepted longitude and latitude query parameters. With this information, I was able to begin coding.

First, I created an event listener to initialize function after the user clicks a button. Then, I created a single function where my NASA API interacts with my weather API. To do so, I used the fetch method to request data from NASA's server, providing me with all the facility locations. I created a "for loop" to iterate through all 485 locations; from this loop I needed to grab the latitude, longitude, and facility name and put them in variables in order to fulfill the query parameters of my second API.

After I retrieved the relevant information from NASA's API, I nested a second fetch method to access the weather API. To make the two API's interact, I took the variables I created in the for loop and passed the longitude and latitude variable names into the url's query parameters. After that, I received an array of each location's temperature in Kelvin. I converted Kelvin to Fahrenheit and used the ParseInt method to return whole numbers.

Finally, I used the appendchild method to show the results of each location into the DOM.

## Lesson's learned
Sophisticated problems can be solved in simple and straightforward ways! At first, I noticed NASA's arrays returned zip code, which is what I wanted to use, because I was more familiar with zip codes- as opposed to coordinate points like longitude and latitude. However, if I were to remain stuck to using zip codes, I would have to use a geocoding weather API, which required more parameters like state, zip code, and country code. By switching gears to using longitude and latitude, I was able to save time and be more efficient.
