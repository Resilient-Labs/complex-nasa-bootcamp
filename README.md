# NASA Locations and Forecast

A list of NASA's facilities, each with the current weather at that location.

A small front-end exercise from the 100Devs bootcamp: it chains two APIs — the first lists the facilities, the second gets the weather for each one.

## What it does

- Loads NASA's facilities dataset (around 400 locations) when the page opens.
- For each facility, shows its name, city, state, and zip code, plus the current temperature in Fahrenheit and conditions from the WeatherAPI.
- Fetches the NASA dataset through a CORS proxy, since the dataset does not allow direct browser requests.

## Tech stack

- HTML, CSS, JavaScript (no build step, no server)
- NASA Facilities dataset — facility names and coordinates
- WeatherAPI — current weather for each facility
- CORS proxy (`corsproxy.io`) — to fetch the NASA dataset from the browser

## How to run it

Open `index.html` in a browser. The list loads on its own — there is nothing to type in. It makes one weather request per facility, so the full list takes a while to fill in.


## Project structure

```
index.html      - heading and the empty facility list the script fills in
css/style.css   - page styling
js/main.js      - facilities fetch and one weather fetch per facility
js/config.js    - API keys
```

---

Thay Brown — thaybrown22@gmail.com · https://thaythecoder.netlify.app · https://github.com/tbrown320 · https://www.linkedin.com/in/thaybrown
