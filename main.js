// get the click action on button to do something
// document.querySelector('button').addEventListener('click', getNasaInfo)
//dont need a button or input for this

//write the code function getTemperature
//declare variable URL with the api
//fetch: https://data.nasa.gov/resource/gvk9-iz74.json + .thenres and .thendata
//inside (data => {} 
// create a list for all 400 locations
//get each list to include a facility's name, location, and weather
//append vs appendChild?????? Remember to ask alum/EIR
//remember to next fetch for weather INSIDE of first fetch
//create table
let url = `https://data.nasa.gov/resource/gvk9-iz74.json`

fetch(url)
    // Converting received data to JSON
    .then(res => res.json())
    .then(data => {
        let tbody = document.querySelector('thead')
        data.forEach((facility) => {
            let tr = document.createElement('tr')
            let td1 = document.createElement('td')
            let td2 = document.createElement('td')
            let td3 = document.createElement('td')
            let td4 = document.createElement('td')
            // let td5 = document.createElement('td')
            td1.innerText = facility.center
            td2.innerText = facility.city
            td3.innerText = facility.state
            td4.innerText = facility.zipcode
            // td5.innerText = facility.zipcode
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tbody.appendChild(tr)

            let url2 = `http://api.weatherapi.com/v1/current.json?key=e6c49dd97c8d4389a68201919221610&q=${facility.zipcode}`
            fetch(url2)
                .then(res => res.json())
                .then(data => {
                    let td5 = document.createElement('td')
                    td5.innerText = data.current.temp_f + data.current.condition.text
                    tr.appendChild(td5)
                    console.log(data)

                })
        })

    })



