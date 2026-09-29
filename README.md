READ ME for NASA Complex problem

Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.

With the use of NASA API we are able to get dataset listing all of NASA's locations. A CORS proxy was used to bypass the fetch error.

We then use the longitude and latitude of those locations to query a weather API to get the current weather in that area.

API's
NASA Facilities - "https://corsproxy.io/?key={CORS_KEY}&url=https://data.nasa.gov/docs/legacy/NASA_Facilities/NASA_Facilities_rows.json"

Weather - https://api.weatherapi.com/v1/current.json?key={weather_api_key}&q={latitude},{longitude}
