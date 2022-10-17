let cities = {};

fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
    .then(response => response.json())
    .then(response => {
        const facility = response.map(location => {
            return `<li> <b>NAME</b>:${location.facility}</li> 
            <li><b>CITY</b>: ${location.city}</li>`;


        });
        document.getElementById('facilities-list').innerHTML = facility;



    })
    .then(() => {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + `Huntsville` + "&appid=d218eddcd1e60fb3ac910f956a8e089c")
            .then(res => res.json())

    })
    .catch(err => console.error(err))