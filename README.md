# NASA Facilities Weather 

A web application that pulls from the NASA facilities API data about all ~400 of it facilites and then gives the current weather of the facility's location.


Link to project: https://nasa-facility-weather.netlify.app/

![NASA Facilities Gif](img/NASA-Facilities.gif)

## How It's Made:

Tech used: HTML, CSS, JavaScript

I used HTML to create the frame of the website. In HTML, I created the outlines of a table and hide the table from the DOM until the function is ran. I used CSS to style the webpage. Then I used JavaScript to create an event listener on the button so that when the user clicks it, it runs the function nasaFacilitiesWeather. This function uses fetch with the NASA Facilities API. From the NASA Facilities API data, I pulled information from the database regarding all of the NASA Facilites including the name of the center, the name of the facilities, and the address of the facilities including the zipcode. Then I nested a second fetch to pull from NASA Facilities API the zipcodes of every facilities through a forEach loop. The Weather API then uses that data to find the weather of the location that the facility is in. Then from the weather api, I pulled the the farenheit temperature from the second for each facility. I used the forEach loop to add cells to the rows of the table and to remove the hidden class of the table so that the user can see the table on the DOM.



## Lessons Learned:
 
With this project, I learned how to create a table element and to use Javascript to add cells to the table through a loop.