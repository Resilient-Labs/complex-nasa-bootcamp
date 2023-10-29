// worked with house hayden on this/ alum Seth

// res.json just makes sure the information you get is returned in json format

// fetch is like an addEventListener 

// api is the person behind the cash register at popeyes -- you're given a bag of food but you don't eat the bag itself

// curl is in the command line vs fetch is in the browser

// goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.

// const locationsInput = document.querySelector('input')
const selectBtn = document.querySelector('button')
const showItems = document.querySelector('#list')


// code for facilities
function getFacilities() {
    const url = `https://data.nasa.gov/resource/gvk9-iz74.json`

    // sending a fetch or call to the website --from the URL it's promising a response 
    // .then is the response from the fetch 
    // res => converted to json format
    // nasaData is the object
    fetch(url)
        .then(res => res.json())
        .then(nasaData => {
            console.log(nasaData[0])

            const addToDom = (obj) => {

                // unpacking the location object using destructuring assignment to get just the individual properties of longitude and latitude (this is a short hand method)
                // latitude: renamed to lat and longitude renamed to lon -- path to these is nasaData.obj.location.latitude
                const { latitude: lat, longitude: lon } = obj.location
                // unpacking the object using destructuring assignment to get just the individual properties of facility, city, and state
                const { facility: addr, city, state} = obj

                // alternative: to be more explicit - create variables for the facility, city, state, etc 

                const listItem = document.createElement('li')
                // allows us to throw the template literal aka the full facility address into the LI
                listItem.innerText = `${addr}, ${city}, ${state}`

                const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bc9cc2d84d997888307f5cccea46ab32`

                fetch(url2)
                 .then(res => res.json())
                 .then(weatherData => {
                    console.log(weatherData)

                    // if this exist?if this exists?if this exists? run the code block only if all are true since this evaluates to true or false
                    if (weatherData?.main?.temp) {
                        let kelvin = weatherData.main.temp
                        let fahrenheit = (kelvin - 273.15) * 9/5 + 32
                        // adds the temp to the facility list listItem.innerText += `Temp ${Math.floor(f)}
                        listItem.innerText += ` Temp: ${Math.floor(fahrenheit)}°F`
                    }

            })
            showItems.appendChild(listItem)
             // append each li (listItem) to the UL similar to the to do list project
            //  throw new Error('STOP THE LOOP')
            // this throw error was just to avoid accidentally rate limiting -- keeps it to just one single location
        }
        nasaData.forEach(addToDom)
        // to add each li to the list in the DOM -- we need 400+ facilities. without forEach, we wouldn't be able to include each of these facilities on the list
        // addToDom is the function expression that starts on line 31

        })
}
// see below for a way to call a function expression
// (() => console.log("HEY")) () 

selectBtn.addEventListener('click', getFacilities)