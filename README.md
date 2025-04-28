# [![NASA Logo](https://img.icons8.com/color/48/nasa.png)](https://www.nasa.gov) NASA Facilities Map  
*Interactive map with real-time weather for NASA facilities worldwide*

![Screenshot 2025-04-07 115949](https://github.com/user-attachments/assets/21fc32cb-bd97-4b29-a4be-a64abf683f73) 
An interactive web application that displays NASA facilities with real-time weather information.


---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **🌐 Interactive Map** | Leaflet.js-powered map with NASA facility markers |
| **🔍 Smart Search** | Find facilities by name, city, state, or country |
| **⛅ Live Weather** | Current conditions display when clicking any facility |
| **📱 Responsive** | Works flawlessly on desktop and mobile devices |
| **🎨 NASA Theme** | Official color scheme and styling |

---

## Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript
- **Mapping**: [Leaflet.js](https://leafletjs.com/)
- **APIs**:
  - [NASA Facilities API](https://data.nasa.gov/resource/gvk9-iz74.json) (Primary data source)
  - [WeatherAPI](https://www.weatherapi.com/) (Real-time weather data)
  - [Nominatim Geocoding](https://nominatim.openstreetmap.org/) (Location coordinates)
- **Icons**: [Icons8](https://icons8.com/)

---

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/immonroe/nasa-facilities-map.git
   cd nasa-facilities-map
   open index.html  # Or start index.html on Windows
   ```
## Usage Guide

- **On Load**: Map displays all NASA facilities automatically
- **Search By**:
  - Facility name
  - City
  - State/Province
  - Country
- **Click Markers** to:
  - View facility details
  - Check current weather
- **Reset**: Use "Show All Facilities" button to clear filters