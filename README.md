# NASA Base Station Weather Map

A live interactive map displaying NASA base stations across the United States with current weather information fetched from the OpenWeather API. Built with [Leaflet.js](https://leafletjs.com/) for mapping.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Screenshots](#screenshots)
7. [Acknowledgements](#acknowledgements)

## Project Overview

This project provides an interactive map that shows NASA base stations across the U.S. Each station is represented with a marker that displays detailed information including:

- Center name
- Facility
- City, State, Country
- Current weather conditions (description and temperature in °F)

Weather data is dynamically fetched from the OpenWeather API.

## Features

- Interactive map using Leaflet.js
- Markers for NASA stations
- Popups displaying station info and live weather
- Fully responsive design

## Technologies Used

<a href="https://www.linux.org" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/linux-colored.svg" alt="Linux" title="Linux" width="36" height="36" /></a>   <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/visualstudiocode-colored.svg" alt="VS Code" title="VS Code" width="36" height="36" /></a>  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg" alt="JavaScript" title="JavaScript" width="36" height="36" /></a>   <a href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg" alt="HTML5" title="HTML5" width="36" height="36" /></a>   <a href="https://www.w3.org/TR/CSS/#css" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg" alt="CSS3" title="CSS3" width="36" height="36" /></a>    <a href="https://git-scm.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/git-colored.svg" alt="Git" title="Git" width="36" height="36" /></a>

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nasa-weather-map.git
````

2. Navigate to the project directory:

```bash
cd nasa-weather-map
```

3. Open `index.html` in a modern web browser (Chrome, Firefox, Edge).

## Usage

1. Open the script.js file.
3. Add your OpenWeather API key in `js/main.js`:

```javascript
const weatherApiKey = 'YOUR_API_KEY_HERE';
```

3. Open `index.html` in a browser.
4. Click on any marker to view the station details and live weather.

## Screenshots

<img width="1885" height="922" alt="nasa-base-station-weather" src="https://github.com/user-attachments/assets/b67701e2-9b8e-4f20-aa0e-71388dd6dbed" />

## Acknowledgements

* [Leaflet.js Documentation](https://leafletjs.com/)
* [OpenWeather API](https://openweathermap.org/api)
* [OpenStreetMap](https://www.openstreetmap.org/)
* [NASA Base Station dataset](https://data.nasa.gov/dataset/nasa-facilities-api/resource/8da12948-3793-4ec1-b5c6-f95e86fd6021)
