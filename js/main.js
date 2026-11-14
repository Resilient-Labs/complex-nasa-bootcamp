import { corsproxy_api_key } from "./config.js"
import { weather_api_key } from "./config.js"

let nasa_url = "https://data.nasa.gov/docs/legacy/NASA_Facilities/NASA_Facilities_rows.json"
let proxy_url = `https://corsproxy.io/?key=${corsproxy_api_key}&url=${nasa_url}`

let facilities = document.getElementById('facility_list')

fetch(proxy_url)
    .then(res => res.json())
    .then(data => {
        console.log(data.data)

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
