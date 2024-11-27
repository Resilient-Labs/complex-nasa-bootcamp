

const table = document.querySelector('table')
const button = document.querySelector('button').addEventListener('click', getData)
const proxy = 'https://crossorigin.me/'
const API = '681788f3622f45f3885185607241710'


// Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508

function getData(){
    
        fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
            .then(res => res.json())
            .then(data => {
                table.innerHTML = `<thead>
                    <tr>
                        <th>Facility</th>
                        <th>Center</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Weather</th>

                    </tr>
                </thead>`

                const uniqufacilities = []

                data.forEach(e =>{
                    if(!uniqufacilities.includes(e.facility)){

                       uniqufacilities.push(e.center) 
                       console.log('center:',e.center)
                    console.log('city:',e.city)
                    console.log('state:',e.state)
                    console.log('zipcode:',e.zipcode)
                    console.log('lon:',e.location.longitude)
                    console.log('lat:',e.location.latitude)
                    
                             fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API}&q=${e.location.latitude},${e.location.longitude}&days=1&aqi=no&alerts=no`)
                        .then(res => res.json())
                        .then(weatherData => {
                            console.log(weatherData)

                            table.innerHTML += ` 
                            <tbody>
                            <tr>
                                <td>${e.facility}</td>
                                <td>${e.center}</td>
                                <td>${e.city}</td>
                                <td>${e.state}</td>
                                <td>${e.zipcode}</td>
                                <td>${weatherData.current.temp_f}</td>
                            </tr>
                            </tbody>`
                          })   
                        }
                })
            })
            .catch(err => {
                console.log(`error ${err}`)
            })
    
}