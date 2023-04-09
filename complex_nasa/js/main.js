const facilities = new Map() //create object to store all non repeating centers
document.querySelector("button").addEventListener("click", getWeather)
const listItems = document.querySelector('#tasks')
let facilitiesSelect = document.querySelector("select")

function getCenter() {
    const url = `https://data.nasa.gov/resource/[Key].json`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (const fac of data) { //loop through and declare variable of fac and give it value of each element is data array
                if (facilities.has(fac.center)) { // if facilities has ...
                    const arr = [...facilities.get(fac.center), fac] // if map has key, assume it has arr and add
                    facilities.set(fac.center, arr)
                } else {
                    facilities.set(fac.center, [fac])
                }
            }
            for (let key of facilities.keys()) { //value is whole facility
                //console.log(key); //key is center name
                const option = document.createElement('option')
                const fac = facilities.get(key) //
                console.log(fac)
                option.dataset.lat = fac[0].location.latitude // creating invisible data sets for coding use
                option.dataset.long = fac[0].location.longitude
                option.appendChild(document.createTextNode(fac[0].center))
                facilitiesSelect.appendChild(option)
            }
        })
}
getCenter();

function getWeather() {

    let selection = document.querySelector("select").value
    const facData = facilities.get(selection) //grabbing entire facility object from the selection key
    const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${facData[0].location.latitude}&lon=${facData[0].location.longitude}&appid=[Key]&units=imperial`
    fetch(url2)
        // honestly Erica was super helpful solving an issue I had displaying the list items only pertaining to the selected Center
        .then(res => res.json())
        .then(weatherData => {
            document.querySelector("h2").innerText = "Current Temp: " + weatherData.main.temp.toFixed(2) + " °F"
            listItems.innerText = ""
            for (const fac of facData) { //loop through and declare variable of fac and give it value of each element is data array
                const li = document.createElement('li')
                li.appendChild(document.createTextNode(`${fac.facility}`))
                listItems.appendChild(li)
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}


// testing various methods Mark showed me
// async function getWeather2() {

//     let selection = document.querySelector("select").value
//     const fac = facilities.get(selection) //grabbing entire facility object from the selection key
//     //console.log(fac)
//     const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${fac.location.latitude}&lon=${fac.location.longitude}&appid=[Key]&units=imperial`
//     const res = await fetch(url2)
//     const weatherData = await res.json()
//     document.querySelector("h2").innerText = weatherData.main.temp.toFixed(2) + " °F"
// }
