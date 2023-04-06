// GLOBALS
const nasaFetch = `https://data.nasa.gov/resource/gvk9-iz74.json`

// BUTTONS
document.querySelector('button').addEventListener('click', () => {
        document.querySelector('h1').innerText = 'Let\'s Go to Outer Space, baby! ...we have liftoff!'
        // document.querySelector('#success').innerText = '...we have liftoff!'
    // NASA FETCH REQUEST
    fetch(nasaFetch)
        .then(res => res.json()) //parse response as JSON
        .then(nasaData => {
            console.log(nasaData)
            let div = document.querySelector('#bodyBox')
            div.innerHTML = ''
            for(let i = 0; i < 400; i++){
                //NASA FETCH VARIABLES
                let centerName = nasaData[i].center
                let control = nasaData[i].facility
                let location = 'STATE: ' + nasaData[i].state + ' | ' + 'COUNTRY: ' + nasaData[i].country + ' | ' + 'ZIP-CODE: ' + nasaData[i].zipcode
                
                // WEATHER FETCH REQUEST
                let lat = nasaData[i].location.latitude
                let long = nasaData[i].location.longitude
                let weatherFetch = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=22c0269bd81a0b37b5be489c5ca6363f&units=Imperial`
                    fetch(weatherFetch)
                    .then(res => res.json()) //parse response as JSON
                    .then(weatherData => {
                        console.log(weatherData)
                        let weatherDisplayF = weatherData.main.temp + '°F'
                        let weatherDisplayC = ((weatherData.main.temp - 32) * 5/9).toFixed(2).replace(/\.?0+$/, '') + '°C' // the replace method finds any decimal point followed by one or more zeros at the end of the string, and replaces them with an empty string
                        let emoji
                        if (weatherData.main.temp >= 84)
                        {
                            emoji = '🥵'
                        }
                        else if (weatherData.main.temp <= 74)
                        {
                            emoji = '🥶'
                        }
                        else
                        {
                            emoji = '😎'
                        }
                        
                        // SET A VARIABLE FOR DISPLAYING DATA; LOOPS AND ADDS A NEW ROW TO THE TABLE
                        //Ellie helped template literals so I could grab them from the HTML and use them as variables in JS
                        let table = document.createElement('table')
                        let displayData = `<tr class = "labels">
                            <td>CENTER</td>
                            <td>CONTROL</td>
                            <td>LOCATION</td>
                        </tr>
                        <tr class = nasa-properties-group-div>
                            <td class = nasa-center-name>${centerName}</td>
                            <td class = nasa-center-control>${control}</td>
                            <td class = nasa-center-location>${location}</td>
                        </tr>
                        <tr class = nasa-properties-solo-div>
                            <td class = nasa-center-imperial>${weatherDisplayF}</td>
                            <td class = nasa-center-metric>${weatherDisplayC}</td>
                            <td class = nasa-emoji>${emoji}</td>
                        </tr>`
                        table.innerHTML = displayData
                        div.appendChild(table)       
                    })
            }
        })
})   

//OLD
// // BUTTONS
// document.querySelector('button').addEventListener('click', () => {
//     document.querySelector('#success').innerText = '...we have liftoff!'
//     // FETCH REQUEST
//     fetch(nasaFetch)
//         .then(res => res.json()) //parse response as JSON
//         .then(nasaData => {
//             console.log(nasaData)

//             // Loop through each item in the nasaData array
//             nasaData.forEach((data, index) => {

//                 //NASA FETCH VARIABLES
//                 let centerName = data.center
//                 let control = data.facility
//                 let location = 'STATE: ' + data.state + ' ' + 'COUNTRY: ' + data.country + ' ' + 'ZIP-CODE: ' + data.zipcode

//                 // Create a new table row for each data item
//                 let row = document.createElement('tr')

//                 // Create table data cells for each data item and append to the row
//                 let centerNameCell = document.createElement('td')
//                 centerNameCell.innerText = centerName
//                 row.appendChild(centerNameCell)

//                 let controlCell = document.createElement('td')
//                 controlCell.innerText = control
//                 row.appendChild(controlCell)

//                 let locationCell = document.createElement('td')
//                 locationCell.innerText = location
//                 row.appendChild(locationCell)

//                 // Append the row to the table
//                 let table = document.querySelector('.table')
//                 table.appendChild(row)

//                 // CALLING GET WEATHER FUNCTION WITHIN THE FETCH REQUEST
//                 getWeather(data.location.latitude, data.location.longitude, index)
//             })
//         })
// })

// function getWeather(lat, long, index) {
//     let weatherFetch = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=22c0269bd81a0b37b5be489c5ca6363f&units=Imperial`
//     fetch(weatherFetch)
//         .then(res => res.json()) //parse response as JSON
//         .then(weatherData => {
//             console.log(weatherData)

//             // Create a new table data cell for the temperature and update the corresponding row
//             let tempCell = document.createElement('td')
//             tempCell.innerText = weatherData.main.temp + '°F'

//             let table = document.querySelector('.table')
//             let row = table.rows[index + 1]
//             row.appendChild(tempCell)
//         })
// }