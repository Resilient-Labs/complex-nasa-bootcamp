# 🚀 NASA Facility Locator 🌌

## 🎯 Goal
Create a **web application** that uses **NASA's API** to:  
- Return all NASA facility locations (~400)  
- Display each facility’s **name** and **location**  
- Show the **current weather** at each facility  

---

## 🚀 Features
- ✅ Fetch all NASA facility data from the API  
- ✅ Display facility **name** and **address/location**  
- ✅ Show **current weather** for each location using a weather API  
- ✅ Responsive table or card layout for easy browsing  
- ✅ Search or filter facilities by name or state (optional)  

---

## 🧩 Tech Stack
- **HTML/CSS** – Page structure and styling  
- **JavaScript (ES6)** – Fetch data from APIs and update the DOM  
- **NASA API** – Provides facility information  
- **Weather API** – Example: [OpenWeatherMap](https://openweathermap.org/api) for real-time weather data  
- **Fetch API** – Handles HTTP requests  

---

## 💻 How It Works
1. The application sends a request to **NASA’s API** to retrieve all facilities.  
2. For each facility, it extracts:  
   - Facility name  
   - Location (city, state, zip)  
3. Sends a request to a **weather API** for each location to get current weather data.  
4. Dynamically displays the results on the webpage in a **table or card format**:  
   - Facility Name  
   - Location  
   - Current Weather  

---

## 📦 Installation & Usage

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nasa-facility-locator.git
