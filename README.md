# NASA Facilities Weather

A small web page that lists NASA facilities and shows the current temperature at each one. Click the button, and the page loads the facility list, looks up the weather for every facility's ZIP code, and shows the results in a scrolling panel.

<img width="525" height="313" alt="Screenshot 2026-10-09 at 8 21 03 AM" src="https://github.com/user-attachments/assets/c9138fab-35d9-4a3b-bd9d-ba9abc83be74" />

## What it shows

For each facility:

- Facility name
- City and state
- Current temperature in °F

## How it works

1. The page reads the list of NASA facilities from a saved file, `facilities.json`.
2. For each facility, it takes the ZIP code and trims it to five digits (`94035-0001` becomes `94035`), because WeatherAPI expects the short format.
3. It asks WeatherAPI for the current weather at that ZIP code.
4. It adds the facility name, location, and temperature to the page.

## Files

| File | What it does |
| --- | --- |
| `index.html` | The page: a heading, a button, and the results area (`#list`) |
| `script.js` | Loads the facilities, looks up the weather, and fills in the page |
| `style.css` | The space-themed look |
| `facilities.json` | A saved copy of NASA's facility list |

## Setup

1. Get a free API key from [WeatherAPI.com](https://www.weatherapi.com/).
2. Open `script.js` and put your key in the weather URL where it says `key=`.
3. Download NASA's facility data from `https://data.nasa.gov/docs/legacy/gvk9-iz74.json` and save it as `facilities.json` in the project folder.
4. Run the project with a local server, such as the Live Server extension in VS Code, and open the page.
5. Click the button.

## Notes

- **Why a saved file?** NASA's server doesn't allow web pages to fetch the data directly (a browser rule called CORS), so the page reads a saved copy instead. NASA's facility list rarely changes, so this is fine.
- **Why a local server?** Browsers block pages from reading local files when you just double-click the HTML file. A local server avoids that.
- **Keep your API key private.** Don't upload `script.js` to a public repository with your real key in it.
- **Lots of requests.** The page sends one weather request per facility each time you click the button, which is roughly 485 requests. Free API plans have limits, so avoid clicking over and over.
- Facilities with no ZIP code in the data are skipped.

## Credits

- Facility data: [NASA Open Data Portal](https://data.nasa.gov/), NASA Facilities dataset
- Weather data: [WeatherAPI.com](https://www.weatherapi.com/)<img width="525" height="313" 
