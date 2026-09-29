# 🚀 Project: Complex NASA API
NASA Facility Weather is a front-end web application that helps users explore NASA facility locations and view the current weather at a selected facility.
### Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently. 

## How It Works
- NASA Facilities API
- Returns facility data:center, facility, city, country, location, latitude, longitude
- User selects a NASA facility
- The app extracts the selected facility's coordinates
- Google Weather API
- Receives the latitude and longitude
- Returns current weather conditions
- The app displays the facility name, location, and weather, humidity, wild, feels like

## APIs Used
### NASA Facilities API
The NASA Facilities API provides information about NASA facilities and locations.
[https://data.nasa.gov/resource/gvk9-iz74.json]

### Google Weather API
The Google Weather API provides current weather conditions based on geographic coordinates.
[https://weather.googleapis.com/v1/currentConditions:lookup?key=api_KEY&location.latitude=37.4220&location.longitude=-122.0841]

## Future Improvements
- Look the facility by city, country, facility or sort by descendent, ascendent

