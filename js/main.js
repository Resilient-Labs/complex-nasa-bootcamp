//Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.



document.querySelector('button').addEventListener('click', getFacilityInfo)





function getFacilityInfo() {
    //use this for nasa facility

    let numOfItemsToShow = document.querySelector("#numberToDisplay").value

    fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {



            for (let i = 0; i < numOfItemsToShow; i++) {
                //-----------------console check-----------------------
                console.log(data)
                console.log("The object: ", data[i])
                console.log("Facility property: ", data[i].facility)
                console.log("Latitude: ", data[i].location.latitude)
                console.log("Longitude: ", data[i].location.longitude)
                //-----------------console check----------------------

                //make a function called getWeather
                //-------fetch request to weather api can be in getWeather function
                //call it here on the the longitude and latidue cordinates of each facility that was called
                //-------logic for displaying in dom can be in that function as well

                let unorderList = document.querySelector('ul') //need to generate the relevant dom nodes on each iteration
                let listElement = document.createElement('li')

                unorderList.appendChild(listElement); // need this so we are constantly replacing which facilitys info is displayed


                let facilityName = data[i].facility

                //document.querySelector('#name').innerText = facilityName


                let facilityLatitude = data[i].location.latitude
                let facilityLongitude = data[i].location.longitude

                getWeather(facilityLatitude, facilityLongitude, listElement, facilityName)// responsible for the complex aspect of the exercise
            }





        })
        .catch(err => {
            console.log(`error ${err}`)

        });





}

function getWeather(lat, lon, li, name) {


    //use this for weather at facility
    let nasaWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=apparent_temperature`    //`https://api.weather.gov/points/${lat},${lon}`
    fetch(nasaWeatherUrl)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)
            console.log(data.hourly.apparent_temperature[0])



            // console.log("Weather data[0]: ", data.data[0].weather.description)


            let temp = data.hourly.apparent_temperature[0]
            // let weatherType = data.data[0].weather.description

            li.innerText = `The name of this facility is: ${name} \n The coordinates for this location are Latitude: ${lat}  and Longitude: ${lon} \n The weather conditions are: ${temp} degrees C`

            //document.querySelector('#location').innerText = `The coordinates for this location are Latitude: ${lat}  and Longitude: ${lon}`
            //document.querySelector('#weather').innerText = `${temp} degrees F : ${weatherType}`
        })
        .catch(err => {
            console.log(`error ${err}`)

        });

}





