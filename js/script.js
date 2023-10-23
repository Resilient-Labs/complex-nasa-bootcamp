// Defining the NASA API URL
const NASA_API_URL = "https://data.nasa.gov/resource/gvk9-iz74.json?$limit=400";
// Defining the Weather API URL
const WEATHER_API_URL = "http://api.weatherapi.com/v1/current.json";
// API key for the Weather API
const WEATHER_API_KEY = "eb07b92799854664bb2150940232010";

// Add event listener to the button with id "fetchData"
document.getElementById("fetchData").addEventListener("click", fetchNasaData);

// Function to add a row to the table
function addRowToTable(centerName, facilityName, temperature, feelsLikeF) {
	// Getting the tbody of the table with id "locations-list"
	const tableBody = document
		.getElementById("locations-list")
		.getElementsByTagName("tbody")[0];
	// Inserting a new row in the table body
	const newRow = tableBody.insertRow();

	// Inserting cells into the new row
	const cell1 = newRow.insertCell(0);
	const cell2 = newRow.insertCell(1);
	const cell3 = newRow.insertCell(2);
	const cell4 = newRow.insertCell(3);

	// Setting the content of each cell
	cell1.innerHTML = centerName;
	cell2.innerHTML = facilityName || "N/A"; // If facility name is not provided, display N/A
	cell3.innerHTML = temperature + "°C";
	cell4.innerHTML = feelsLikeF + "°F";
}

// Function to fetch weather data based on latitude and longitude
function fetchWeatherData(lat, lng, centerName, facilityName) {
	// Building the endpoint URL for the Weather API
	const weatherEndpoint = `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${lat},${lng}`;

	// Fetching the weather data
	fetch(weatherEndpoint)
		.then((response) => response.json())
		.then((weatherData) => {
			// Extracting relevant weather details
			const temperature = weatherData.current.temp_c;
			const feelsLikeF = weatherData.current.feelslike_f;

			// Adding this weather data to the table
			addRowToTable(centerName, facilityName, temperature, feelsLikeF);
		})
		.catch((error) => {
			// Logging any errors that might happen
			console.log(
				`Failed to fetch weather data for ${centerName} - ${facilityName}: ${error}`
			);
		});
}

// Function to fetch data from NASA
function fetchNasaData() {
	// Logging the start of the data fetching process
	console.log("Fetching data...");

	// Fetching data from the NASA API
	fetch(NASA_API_URL)
		.then((response) => response.json())
		.then((data) => {
			// Creating a set of unique centers
			let uniqueLocations = {};
			data.forEach((location) => {
				if (
					location.location &&
					location.location.latitude &&
					location.location.longitude
				) {
					const lat = location.location.latitude;
					const lng = location.location.longitude;
					// Creating a unique key for each center based on several attributes
					const key = `${location.center}-${location.facility}-${lat}-${lng}`;
					uniqueLocations[key] = location;
				}
			});

			// For each unique location, fetch its weather data
			Object.values(uniqueLocations).forEach((location) => {
				const lat = location.location.latitude;
				const lng = location.location.longitude;
				fetchWeatherData(lat, lng, location.center, location.facility);
			});
		})
		.catch((error) => {
			// Logging any errors that might happen
			console.log(`Failed to fetch NASA data: ${error}`);
		});
}
