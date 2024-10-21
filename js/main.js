// I am creating a list of nasa facilities that will appear by calling the API: https://data.nasa.gov/resource/gvk9-iz74.json ( original link, before I preparsed.)

// I am going to have a search bar where the user can enter in either a center name or a city and state and using the nasa facility api (that I pre parsed using the NASA open data portal) to display on the dom: center name, facility name, city, state, country, zip code. I will also be getting the lat and long and set them as const variables to be used in the second API.

// The second api nested inside of the first will run the weather iwth the given lat and long parsed fromt the firsrt API.


document.querySelector('#button').addEventListener('click', getFacility)

//added in a btn to scroll back up since the list can get long.
// found the code via google.



function getFacility() {

    const searchBox = document.querySelector('#searchBox').value.trim().toLowerCase();


    console.log('user inout from searchBox:', searchBox)


    const results = document.getElementById('results');
    results.innerHTML = ''; // <-- makes sure to clear data to before new search.


    fetch('https://data.nasa.gov/resource/gvk9-iz74.json?$query=SELECT%0A%20%20%60center%60%2C%0A%20%20%60facility%60%2C%0A%20%20%60location%60%2C%0A%20%20%60city%60%2C%0A%20%20%60state%60%2C%0A%20%20%60zipcode%60%2C%0A%20%20%60country%60') // <-- first fetch for all NASA facitilites
        .then(res => res.json())
        .then(data => {

            console.log(data)

            const parsedSearch = [] // array to find matches from user input.

            // reading that helped get me through looping through arrays:
            //https://www.geeksforgeeks.org/how-to-loop-through-an-array-containing-multiple-objects-and-access-their-properties-in-javascript/

            // https://stackoverflow.com/questions/69014358/how-to-loop-through-multiple-arrays-within-objects-in-a-json-api-using-javascrip

            //https://www.geeksforgeeks.org/how-to-iterate-json-object-in-javascript/#using-forin-loop

            const [city, state] = searchBox.includes(',') ? searchBox.split(',').map(part => part.trim().toLowerCase()) : [searchBox, null]


            for (const facility of data) {
                let matched = false;
                if (facility.center.toLowerCase() === searchBox || facility.city.toLowerCase() === searchBox || facility.state.toLowerCase() === searchBox || facility.country.toLowerCase() === searchBox) {
                    matched = true; // to check and see if a center, city, or state matched. if user types 'us or US, the complete list will appear on the DOM.
                }
                if (matched) {
                    parsedSearch.push(facility)
                }
            }

            if (parsedSearch.length === 0) { //sets a condition for no facilities found.
                results.innerHTML = 'No facilities found, try again.'
                return

            }
            console.log(data)
            console.log(data.latitude)
            console.log(data.longitde)

            parsedSearch.forEach(facility => { //how to display facilities, creating new element to div to place facility info.
                const facilityInfo = document.createElement('div')
                facilityInfo.innerHTML =


                    ` <br>
                            Facility: ${facility.facility}<br>
                            Center: ${facility.center}<br>
                            City: ${facility.city}<br>
                            State: ${facility.state}<br>
                            Country: ${facility.country}<br>
                            Zipcode: ${facility.zipcode}<br>
                            `

                    ;
                results.appendChild(facilityInfo); // makes the facilityInfo el a child of results.

                //parsed from the obj called location nested in each facility obj.
                const newLat = facility.location.latitude; // taken from matched facility
                const newLon = facility.location.longitude; // taken from matched facility
                console.log(`lat: ${newLat}, lon: ${newLon}`)

                // ------- Begin API #2! ---
                const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${newLat}&longitude=${newLon}&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&forecast_days=1&models=gfs_seamless`


                fetch(url2)
                    .then(res => res.json())
                    .then(weatherData => {
                        console.log(url2)
                        console.log(weatherData)

                        const temp = weatherData.current.temperature_2m
                        const weatherInfo = document.createElement('div')
                        weatherInfo.innerHTML = `Current Tempreture: ${temp} °F`
                        facilityInfo.appendChild(weatherInfo);

                    })

                    .catch(err => {
                        console.error(`Error fetching weather data: ${err}`);
                    });
            });
        })
        .catch(err => {
            results.innerHTML = 'Error fetching data. Please try again.';
            console.error(`Error: ${err}`);
        });
}

//added in a btn to scroll back up since the list can get long.
// found the original code via google.
  
    backToTopButton.addEventListener("click", function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      });

