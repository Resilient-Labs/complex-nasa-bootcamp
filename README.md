## Lists official NASA facilities and displays their current local temperature in real-time.

## Features
Facility Listing: Fetches and displays official NASA facility names, cities, and countries.

Live Weather Updates: Retrieves current weather conditions for each location based on geographic latitude and longitude coordinates.

Dynamic Rendering: Updates the page dynamically as weather data loads for each facility.

## APIs Used
NASA Facility Dataset: [https://data.nasa.gov/docs/legacy/gvk9-iz74.json](https://data.nasa.gov/docs/legacy/gvk9-iz74.json) (accessed via CORS proxy)

Open-Meteo Weather API: [https://api.open-meteo.com/v1/forecast](https://api.open-meteo.com/v1/forecast)

## How It Works
Fetches official NASA facility locations and coordinates.

Displays the facility details on the webpage with blank temperature placeholders.

Requests current weather data for each facility using its specific coordinates.

Populates the temperature for each location dynamically once retrieved.

## Built With
HTML

CSS

JavaScript




<img width="2879" height="1578" alt="image" src="https://github.com/user-attachments/assets/0205666d-a2a9-43f0-b7c6-72e51c2ba88a" />
