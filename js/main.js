
// Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.
const weatherCodes = {
	0: 'clear skies',
	1: 'mainly clear',
	2: 'partly cloudy',
	3: 'overcast',
	45: 'foggy',
	48: 'foggy',
	51: 'light drizzle',
	53: 'moderate drizzle',
	55: 'heavy drizzle',
	56: 'freezing drizzle',
	57: 'freezing drizzle',
	61: 'light rain',
	63: 'moderate rain',
	65: 'heavy rain',
	66: 'freezing rain',
	67: 'heavy freezing rain',
	71: 'light snow',
	73: 'moderate snow',
	75: 'heavy snow',
	77: 'light snow',
	80: 'light rain showers',
	81: 'moderate rain showers',
	82: 'violent rain showers',
	85: 'light snow showers',
	86: 'heavy snow showers',
	95: 'thunderstorms',
	96: 'light thunderstorms with hail',
	99: 'heavy thunderstorms with hail',
};


document.querySelector('button').addEventListener('click', getPictureOfDay)

const tbody = document.querySelector('tbody')
function getPictureOfDay() {
	const nasaLocationUrl = `https://data.nasa.gov/resource/gvk9-iz74.json`

	fetch(nasaLocationUrl)
		.then(res => res.json())
		.then(dataNasa => {
			dataNasa.forEach(e => {
				let lat = e.location.latitude
				let lon = e.location.longitude
				let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
				fetch(weatherUrl)
					.then(res => res.json())
					.then(dataWeather => {

						let str = `<tr><td class="facilityName">${e.center}</td><td class="facilityLocation">${e.city},${e.state}</td><td class="weather">${(dataWeather.current_weather.temperature * 9 / 5) + 32} °F, ${weatherCodes[dataWeather.current_weather.weathercode]}</td></tr>`

						document.querySelector('#info').innerHTML += str
					})
			});
		})

		.catch(err => {
			console.log(`error ${err}`)
		});



}
document.querySelector("#sort").addEventListener('click', sort)

function sort() {
	$(document).ready(function () {
		$('#example').DataTable({
			"paging": true,
			"ordering": true,
			"info": false,
			stateSave: true
		});
	});

	$(".table_link").on("click", function () {
		$('#example').DataTable().state.clear();
	});
}