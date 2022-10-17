document.querySelector("button").addEventListener("click", () => {

    // When the button is clicked, remove the background image and add color black
    document.body.style.background = 'none';
    document.body.style.backgroundColor = "black";
    let key = "f91af75b3d52f3032a0ed01ea95ccf11"


        // Fetch NASA api which returns location of facilities
        fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
        .then(res => res.json()) // parse response as JSON
        .then(data => {


        data.forEach((element, index) => {

            // Store Latitude and Longitude. We'll use them later for the weather api
            let locationLatitude = data[index].location.latitude
            let locationLongitude = data[index].location.longitude


            // Create a section
            let section = document.createElement("SECTION")
            // Add the section to the body
            document.body.appendChild(section)

            // Create ul
            let ul = document.createElement("ul") 

            // Create 4 list item
            let liFacility = document.createElement("li") 
            let liCity = document.createElement("li") 
            let liState = document.createElement("li") 
            let liTemperature = document.createElement("li") // To store the weather that we'll fetch from openweathermap api
            
            // Add text into the li
            liFacility.appendChild(document.createTextNode(`${data[index].facility}`))
            liCity.appendChild(document.createTextNode(`${data[index].city}`))
            liState.appendChild(document.createTextNode(`${data[index].state}`))


            // Append li to ul
            ul.appendChild(liFacility)
            ul.appendChild(liCity)
            ul.appendChild(liState)

        //      //Call 2nd api that will get the weather for us. Pass in the locationLatitude and locationLongitude variables that we grabed from NASA api
        //     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationLatitude}&lon=${locationLongitude}&appid=${key}&units=imperial`)
        //     .then(res => res.json()) // parse response as JSON
        //     .then(data => {

        //         let temperature = data.main.temp

        //         //Add text into the li
        //         liTemperature.appendChild(document.createTextNode(`${temperature}`))

        //     })
        //     .catch(err => {
        //         onsole.log(`error ${err}`)
        // });

            // Append li to ul
            ul.appendChild(liTemperature)

            //append ul to section
            section.appendChild(ul)


        })
        })
        .catch(err => {
            console.log(`error ${err}`)
    });
})