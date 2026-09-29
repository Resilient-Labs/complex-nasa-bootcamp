# 🚀 NASA Facility Directory

This app lists NASA centers and facilities across the U.S. and shows the current temperature at each one. It gets the facility info from NASA's public dataset, then uses each facility's coordinates to get the weather from the Open-Meteo API.

**Link to project:** https://complex-nasa-api-project.netlify.app

[![Screenshot-2026-09-29-at-6-22-05-AM.png](https://i.postimg.cc/s1FJtX9Q/Screenshot-2026-09-29-at-6-22-05-AM.png)](https://postimg.cc/H825MTNd)

## How It's Made:

**Tech used:**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

I started with NASA's facilities data, which has the name, city, state, zip code, and latitude/longitude for every facility. For each facility I took the latitude and longitude and put them into the Open-Meteo URL to get the current temperature in Fahrenheit.

When the weather comes back, I create a list item with the facility name, location, and temperature and add it to the page. I didn't use a framework for this, just JavaScript and the DOM.

## Optimizations

When I called NASA's API directly, I kept running into CORS errors and 429 (too many requests) errors. To get around that, I saved the NASA data locally in assets/data/facilities.json and load it from there instead.

Something I want to fix: the weather requests all run at the same time, so the facilities show up in a different order each time depending on which response comes back first. I'd like to use `Promise.all()` so the list loads in the same order every time.

## Lessons Learned:

This was my first time using data from one API to call another API. At first I didn't get why the weather fetch had to go inside the `.then()` of the NASA fetch, but it's because I don't have the coordinates until the first response comes back. I used a lot of `console.log` to figure out what the data looked like and how to get to nested values like `location.latitude`.
