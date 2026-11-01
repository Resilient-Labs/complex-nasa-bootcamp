# NASA Facilities and Weather Explorer

A web application that displays NASA facilities, their locations, and current weather information.

I built this project to practice combining data from two sources, working with fetch requests, and displaying results in a table.

## Live Application

<!-- Add the new Render Web Service URL after deployment. -->

## Screenshot

<img width="822" height="292" alt="Complex Nasa API" src="https://github.com/user-attachments/assets/2a60e428-9a63-49a3-8cff-0083b16d5895" />

## Features

- Choose how many NASA facilities to display.
- View facility names and locations.
- View current temperatures in Fahrenheit and weather conditions.
- Display loading and error messages.
- Use a saved NASA dataset if the live NASA request fails.
- Reuse weather requests for facilities at the same coordinates.

Visitors do not need to enter an API key.

## Built With

- HTML
- CSS
- JavaScript
- Node.js
- Express
- dotenv
- Fetch API
- NASA facility data
- WeatherAPI

## How It Works

1. The browser requests NASA facility data.
2. If the live NASA request fails, the app loads the saved dataset.
3. JavaScript creates a table row for each selected facility.
4. The browser sends each facility’s coordinates to the Express `/api/weather` route.
5. Express requests weather information from WeatherAPI using a key stored in an environment variable.
6. The browser displays the temperature and weather condition in the table.

The browser does not receive the WeatherAPI key.

## Project Structure

- `index.html` — Page structure, dropdown, button, and results table.
- `CSS/nasa-complex.css` — Page styling.
- `JS/nasa-complex.js` — Facility requests, table updates, and weather requests to the server.
- `data/nasa-facilities.json` — Saved NASA facility data used as a fallback.
- `server.js` — Serves the website and handles WeatherAPI requests.
- `package.json` — Lists dependencies and project commands.
- `.gitignore` — Excludes private settings and installed packages.

## Run Locally

1. Clone the repository and switch to the `answer` branch.

2. Open the project folder and install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file beside `server.js`:

   ```env
   WEATHER_API_KEY=your_weatherapi_key
   ```

4. Start the application:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000).

Use the Express server rather than Live Server. The weather feature depends on the server’s `/api/weather` route.

## Environment Variables

- `WEATHER_API_KEY` — The private WeatherAPI key.
- `PORT` — The server port supplied by the host; defaults to 3000 locally.

The `.env`, `config.js`, and `node_modules/` paths are excluded through `.gitignore`.

The application no longer loads the old browser-side `config.js`.

## Deploy on Render

Deploy this version as a **Web Service**, rather than a Static Site.

- **Branch:** `answer`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variable:** `WEATHER_API_KEY`

Enter the actual key privately in Render’s environment settings. Do not add it to GitHub.

## Current Limitations

- Live NASA data may be unavailable or blocked by browser CORS restrictions.
- The saved NASA dataset may not reflect recent facility changes.
- Facilities without coordinates cannot receive a weather result.
- Weather availability depends on WeatherAPI and the account’s request limits.
- Selecting many facilities can take longer to finish.

## What I Learned

- How to combine facility and weather data.
- How to use promises and fetch requests.
- How to create table rows with JavaScript.
- How to handle failed requests and use fallback data.
- How to reuse requests for shared locations.
- How to use Express to keep an API key out of browser code.
- How Static Sites differ from Web Services.

## Credits

- Based on the `complex-nasa-bootcamp` starter from Resilient Labs.
- Facility data provided by [NASA](https://data.nasa.gov/).
- Weather information provided by [WeatherAPI](https://www.weatherapi.com/).

## Author

Sushana Thomas