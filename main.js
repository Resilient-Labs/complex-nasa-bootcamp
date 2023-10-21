// document.querySelector('button').addEventListener('click', findPhoto);

document.addEventListener('DOMContentLoaded', function () {
    const url = 'https://data.nasa.gov/resource/gvk9-iz74.json';

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            const table = document.getElementById('nasa').querySelector('tbody');

            data.forEach((element) => {
                const newRow = table.insertRow(-1);

                const centerCell = newRow.insertCell(0);
                centerCell.textContent = element.center;

                const coordinatesCell = newRow.insertCell(1);
                coordinatesCell.textContent = `Latitude: ${element.location.latitude}, Longitude: ${element.location.longitude}`;

                const locationCell = newRow.insertCell(2);
                locationCell.textContent = `State: ${element.state}`;

                const lat = element.location.latitude;
                const lon = element.location.longitude;

                // API 2

                const apikey2 = '37005540aed4d716830f9473fc5a0166';
                const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey2}`;

                fetch(url2)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        let f = (data.main.temp - 273.15) * (9 / 5) + 32;
                        f = f.toFixed(2);
                        let desc = data.weather[0].description;

                        const tempCell = newRow.insertCell(3);
                        tempCell.innerHTML = `${f}`;

                        const weatherCell = newRow.insertCell(4);
                        weatherCell.innerHTML = `${desc}`;
                    })
                    .catch((error) => {
                        console.error('Error fetching weather data:', error);
                    });
            });
        })
        .catch((error) => {
            console.error('Error fetching NASA data:', error);
        });
});



