
//we created a function to get every nasa facility and corresponding temps at their locations (call function at bottom)
function getNasaFacility() {

    //nasa api telling all facility locations (no key required)
    const url = `https://data.nasa.gov/resource/gvk9-iz74.json`

    //we are fetching(getting) data from the nasa url 
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)


            //change for loop before submitting (change line 11 to for (let i = 0; i < data; i++) {

            //this for loop loops through every entry (individually one by one)
            for (let i = 0; i < 20; i++) {

                //we create the name, city, and facilityTemp elements 
                const name = document.createElement('h3')
                const city = document.createElement('h4')
                const facilityTemp = document.createElement('h2')

                //craeted a div element to hold sections
                const divEle = document.createElement('div')

                
                //then here we take all elements and attach them to the element .location in our html (dynamic creation)
                divEle.appendChild(name)
                divEle.appendChild(city)
                divEle.appendChild(facilityTemp)
                document.querySelector('.location').appendChild(divEle)

                //here we are setting the inner text of the elements we created above to data entries we got from our fetch which are data[i].city
                //we created and told them where to go now we fill them with data
                city.innerText = data[i].city
                name.innerText = data[i].facility

                //this is slice the zip code for each entry to the first 5 digits ex 12345-6789 would become 12345
                let zipCode = data[i].zipcode.slice(0, 5)

                //this is the zip code where we put the second fetch we must put it here so we could access it

                //we put the zip code temporal literal into our second url as a search parameter (links both)
                //we also specialized units=imperial to return us weather in Farenheit
                const urlTwo = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=173108aa082b385d49200718fe643485&units=imperial`

                //our second fetch to our second url with a piece of data from our first fetch
                fetch(urlTwo)
                    .then(res => res.json()) // parse response as JSON
                    .then(weatherData => {

                        //we are assigning the value of weatherData.main.temp into the already created facilityTemp variable
                        facilityTemp.innerText = weatherData.main.temp

                    })

                    //standard error catches
                    .catch(err => {
                        console.log(`error ${err} `)
                    });

            }
        })
        .catch(err => {
            console.log(`error ${err} `)
        });
}

//lastly we call the function to run it
getNasaFacility()