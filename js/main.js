import { nasa_api_key } from "./config.js"
import { weather_api_key } from "./config.js"
// 
//https://data.nasa.gov/docs/legacy/NASA_Facilities/NASA_Facilities_rows.json
//need cors in the fetch below to get the data form the nasa api
// fetch(`https://cors.id/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         spaceData = JSON.parse(data.body)
//         console.log(spaceData)
//     })

const nasa_url = "https://data.nasa.gov/docs/legacy/NASA_Facilities/NASA_Facilities_rows.json"
// const proxy_url = "https://api.allorigins.win/get?url=" + encodeURIComponent(nasa_url)
const proxy_url = "https://corsproxy.io/?key=8757a5a2&url=https://data.nasa.gov/docs/legacy/NASA_Facilities/NASA_Facilities_rows.json"

let facilities = document.getElementById('facility_list')

fetch(proxy_url)
    .then(res => res.json())
    .then(data => {
        console.log(data.data)
        // console.log(data.data[0])
        // let facility_name = data.data[0][8]
        // console.log(facility_name)
        // let facility_lat = data.data[0][20][1]
        // let facility_long = data.data[0][20][2]
        // console.log(`${facility_lat}, ${facility_long}`)
        // let city = data.data[0][21]
        // let state = data.data[0][22]
        // let zip_code = data.data[0][23]
        // console.log(city, state, zip_code)

        facilities.innerHTML = ''
        let facility_list = []

        data.data.forEach(facility => {
            
            let facility_name = facility[8]
            let city = facility[21]
            let state = facility[22]
            let zip_code = facility[23]
            let latitude = facility[20][1]
            let longitude = facility[20][2]
            let address = `${facility_name}, ${city}, ${state}, ${zip_code}`
            console.log(address)
            console.log(longitude, latitude)

            fetch(`https://api.weatherapi.com/v1/current.json?key=${weather_api_key}&q=${latitude},${longitude}`)
                .then(res => res.json())
                .then(weather => {
                    console.log(weather)
                    let temperature = (weather.current.temp_f)
                    let conditions = (weather.current.condition.text)
                    let icon = (weather.current.condition.icon).src

                    let li = document.createElement('li')
                    let img = document.createElement('img')
                    li.append(`${address}, Current Weather: ${temperature}° F, ${conditions}`)
                    facilities.appendChild(li)
                    img.append
                })
        })
            
            ;
})
