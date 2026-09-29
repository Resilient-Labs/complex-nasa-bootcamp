# NASA Facility Weather

A lightweight front-end app that pulls NASA facility data and shows the current weather for each location using the Open-Meteo API.

## Demo

![Allergen Check demo](image/facility.png)

## Overview

This project displays a searchable list of NASA facilities, lets users click a facility to view its live weather, and shows key weather details such as temperature, feels-like temperature, wind speed, humidity, and weather condition description.

## Features

- Loads facility data from a local JSON file containing NASA locations
- Searches facilities by name, city, or state
- Displays a card for each facility in the list
- Shows weather details for the selected facility
- Includes latitude and longitude information
- Maps weather codes to readable descriptions

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- NASA facility JSON dataset
- Open-Meteo Forecast API

## Project Structure

- `index.html` – app layout and UI structure
- `css/style.css` – styling for the layout and cards
- `js/main.js` – data fetching, search logic, and weather rendering
- `data/nasa-facilities.json` – NASA facility dataset



## How It Works

- The app loads a filtered set of NASA facility records from `data/nasa-facilities.json`
- Users can type into the search box to narrow the list of centers
- Clicking a facility triggers a weather request using its latitude and longitude
- The weather response is converted to Fahrenheit and displayed in the weather card

## Data Sources

- NASA facility data: bundled in `data/nasa-facilities.json`
- Weather data: Open-Meteo API

## Notes

This is a front-end-only project intended for learning and demonstration. It does not require a backend or API key for the weather request.

