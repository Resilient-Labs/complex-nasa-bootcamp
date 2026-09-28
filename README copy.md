# NASA Facility And Weather

A web application that displays a list of all NASA facilities, including location and current weather.

This project uses 2 API's together. Results from the first API are used as query parameters for the second. The NASA data API provided information about the facilities including name, city, state, and latitutde and longitude coordinates. Those coordinates are used to retreive weather information from the Open Weather API.

## How it works 
1. NASA facility data is retreived from its dataset.
2. Each facility is looped through and their name and location are displayed.
3. Each facilty has a button that, when clicked, passes the facility's latitude and longitude to the weather function.
4. Data is retreived from the weather API and displayed.

## Author
Myjah Snape 