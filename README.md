# NASA Facilities Weather

Click a button, get every NASA facility's location plus its current temperature. Two public APIs chained together, one paragraph per facility.

![NASA Facilities screenshot](screenshot.jpg)

## How the code works

`getFacilities()` fires on the button click. It fetches NASA's public facilities dataset, loops through the results, and pulls out each center's name, city, state, country, and coordinates. Then it hands each one to `coordinate()`, which builds an Open-Meteo forecast URL for that latitude and longitude, asks for the current apparent temperature in Fahrenheit, and appends a line like "Kennedy Space Center, Merritt Island, FL, USA, 82F" to the page.

The interesting part is the fan-out, and honestly the tradeoff in it. One NASA request returns N facilities, and each one triggers its own weather request, so a full run is N+1 HTTP calls fired in a loop. It works, but I keep thinking about how I'd optimize it: wrap the per-facility fetches in `Promise.all` so the weather calls run in parallel instead of racing the event loop one at a time, and maybe cap the concurrency. The two APIs never talk to each other; the coordinates from the first become the input to the second, which is a clean little data pipeline once you see it.

The hardest part was wrangling two unrelated APIs into one flow. NASA's dataset nests coordinates inside a location object, Open-Meteo wants plain lat/lng numbers, so most of the work was just reshaping data between the two calls.

Built with HTML, CSS, and vanilla JavaScript. My code is on the `answer` branch.
