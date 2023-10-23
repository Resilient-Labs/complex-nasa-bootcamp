//create a smurf (event listener) on the button so that once clicked it runs a function 

document.querySelector('button').addEventListener('click', nasaFacilitiesWeather)


//store the table element in a variable
let table = document.querySelector('table')




//create function that fetches the information from NASA Facilities API and a Weather API 

function nasaFacilitiesWeather() {

    //once function is called/executed the table element shouldn't be hidden anymore
    table.classList.remove('hidden')

    //store the nasa facility api url in a variable 
    const urlA = 'https://data.nasa.gov/resource/gvk9-iz74.json'

    //create the first fetch, this fetch should pull the data from the NASA api
    fetch(urlA)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            //Need to access each element of the data array returned from the fetch response. Can probably do this with a loop
            data.forEach((facilities) => {

                //from each element pull the zipcode of each facility location to use for the weather api. store in a variable
                let zip = `${facilities.zipcode}`

                //create a row that is added to the end of the table for each element. store this in a variable
                let row = table.insertRow(-1)

                //use the row variable to create variables for each column in the table and insert a cell into the column of the created headers.
                let centersCol = row.insertCell(0)
                let facilityCol = row.insertCell(1)
                let locationCol = row.insertCell(2)
                let weatherCol = row.insertCell(3)

            
                //for each element add the facility's center name to the center column 
                centersCol.innerHTML = facilities.center

                //for each element add the facility's name to the facility column 
                facilityCol.innerHTML = facilities.facility

                //for each element add the facility's location (city, state and zipcode) to the location column
                locationCol.innerHTML =`${facilities.city}, ${facilities.state} ${zip}`

                //store the weather api url in a variable, use the zip variable to from the previous fetch data as a query parameter for the weather api
                let urlB = `https://api.weatherapi.com/v1/current.json?key=0888e350fe4a4f9f908191011231810&q=${zip}`

                //nest the second fetch within the first fetch and within the loop 
                fetch(urlB)
                    .then(res => res.json())
                    .then(data => {
                        
                        //pull the farenheit temp from the weather api and round the float to and integer. store value in a variable
                        let temp = Math.floor(data.current.temp_f)

                        //create a variable to store the integer temperatures of the facility with the farenheit symbol
                        let fTemp = `Temp: ${temp}°F`

                        //for each element add the facility's temperature to the weather column
                        weatherCol.innerHTML = fTemp

                    })
                    //catch errors
                    .catch(err => {
                        console.log(`error${err}`)
                    })

            })


        })
        //catch errors
        .catch(err => {
            console.log(`error${err}`)
        })

}