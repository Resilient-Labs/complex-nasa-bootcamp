// NASA LINK https://data.nasa.gov/dataset/nasa-facilities-api
// key 4jz3SmFZHuExCLg1aLMZmCfx7TVFZ6iWedP7Gur0
///return all of their facility locations (~400). 
//Display the name of the facility,its location
// The weather at the facility currently
// on page load an temp 
document.querySelector('button').addEventListener('click', fourHunna)

function fourHunna() {
    
    ///vvv becasue we added the corse link in front of our real url
    // we need to create a new variable and parse the data information because
    // its not a json file its just plain text so we must convert it back.
    // https://cors.io/?url. <-- CORS error correction
    const url = `https://cors.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`


    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log(data)

            const getData = JSON.parse(data.body)

            getData.forEach((item) => {
                // create the variables you will pull out
                const center = item.center;
                const facility = item.facility;
                const state = item.state;
                const country = item.country;
                const zipcode = item.zipcode
                const latty = item.location.latitude
                const longy = item.location.longitude

                // ALWAYS CONSOLE TO CHECK
                // console.log(latty)
                // console.log(longy)


                ///////////////////////////////////
                /// CREATED LOCATION FOR SECOND API
                ///////////////////////////////////
                const location = document.createElement('p')
                location.textContent = `${latty},${longy}`
                // console.log(`Location:`, location)


                // // Call API 2 from inside API 1
                weather(latty, longy, center, facility, state, country, zipcode)

            })


        })
        .catch(error => {
            console.log(error)
        })
}


//////////////////////
// API 2 - WEATHER
//////////////////////

function weather(latty, longy, center, facility, state, country, zipcode) {
    console.log('Location from API 1:', latty, longy)

    //vvv create container 
    const container2 = document.querySelector('#tempList')

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latty}&longitude=${longy}&hourly=apparent_temperature&current=apparent_temperature&forecast_days=1&temperature_unit=fahrenheit`;

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log("API 2", data)

            //CREATE A SMALLER CONTAINER
            const cardB = document.createElement('section')
            cardB.classList.add('cardB')

            // CREATE THE INDIVIDUAL PULLS
            const current = document.createElement('p');
            current.textContent = `Current Temperature: ${data.current.apparent_temperature}°F`
            console.log(current)

            const facilityIt = document.createElement('p')
            facilityIt.textContent = `Facility: ${facility}`

            const centerIt = document.createElement('p')
            centerIt.textContent = `Center: ${center}`

            const stateIt = document.createElement('p')
            stateIt.textContent = `State: ${state}`

            const countryIt = document.createElement('p')
            countryIt.textContent = ` Country: ${country}`

            const zipcodeIt = document.createElement('p')
            zipcodeIt.textContent = `Zipcode: ${zipcode}`

            //append all the items to the small container(card)
            cardB.append(facilityIt, centerIt, stateIt, countryIt, zipcodeIt, current)

            //append the small container(card) to the big container
            container2.appendChild(cardB)

        })

        .catch(error => {
            console.log(error)
        })


}
