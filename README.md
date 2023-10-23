# NASA Locations Weather

Hey there! 😊 I created this web application to fetch NASA locations and then use that data to fetch their current weather. Here's a breakdown of what I've done!

## Table of Contents

- [Code Snippets](#code-snippets)
- [What I Learned](#what-i-learned)
- [How to Run](#how-to-run)

## Code Snippets

Below are some important code snippets from my JavaScript file. They were super challenging to figure out but I managed!

### Fetching NASA Data

```javascript
// Fetching data from the NASA API
fetch(NASA_API_URL)
	.then((response) => response.json())
	.then((data) => {
		// Some code here...
	})
	.catch((error) => {
		console.log(`Failed to fetch NASA data: ${error}`);
	});
```

### Adding Data to Table

```javascript
// Function to add a row to the table
function addRowToTable(centerName, facilityName, temperature, feelsLikeF) {
	// Getting the tbody of the table with id "locations-list"
	const tableBody = document
		.getElementById("locations-list")
		.getElementsByTagName("tbody")[0];
	// Some more code here...
}
```

### Fetching Weather Data

```javascript
// Fetching the weather data
fetch(weatherEndpoint)
	.then((response) => response.json())
	.then((weatherData) => {
		// Extracting relevant weather details
		const temperature = weatherData.current.temp_c;
		// Some more code here...
	})
	.catch((error) => {
		console.log(
			`Failed to fetch weather data for ${centerName} - ${facilityName}: ${error}`
		);
	});
```

## What I Learned

This project taught me a ton! 😅 Here's what I learned from the JS file:

1. **Chaining API Calls**: Although I've used the `fetch` API before, this was the first time I took the result of one API and then used it as a parameter for another. It was cool to see how data from one source can inform a request to another!

2. **Manipulating the DOM**: Adding new rows to a table dynamically was interesting. It was a neat exercise in updating the UI based on dynamic data.

3. **Error Handling**: Handling errors when making API calls is always important, and this project reinforced that for me. It's crucial to understand where and why things might go wrong.

4. **Creating Unique Keys**: Figuring out how to create a unique key for each NASA location using its attributes was a cool challenge. This ensured I wasn't adding duplicate locations.

## How to Run

1. Clone the repository to your local machine.
2. Open the `index.html` file in your favorite browser.
3. Click on the "Fetch Data" button and enjoy! 🚀

Hope you enjoy checking out my project! Feedback always welcome. 🌟
