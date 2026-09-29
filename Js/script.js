// Goal: Use NASA's API to return all of their facility locations (~400).
//  Display the name of the facility, its location, and the weather at the facility currently.
// NASA URL https://data.nasa.gov/docs/legacy/gvk9-iz74.json
//Weather URL http://api.weatherapi.com/v1/current.json?key=c40ef9d8cf514de6aa6161333262409&q=${cityInput},${countryInput}`
document.querySelector("button").addEventListener('click' ,getData)

function getData(){

const url1="https://cors.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json"

const num =document.querySelector('select').value

fetch(url1) 
.then (res => res.json())
.then ((data) => {
    console.log(data)
    const dataReform= JSON.parse(data.body)

    for (let i = 0 ; i <= num; i++){
        const column = document.createElement('tr')
        column.innerHTML = `<td>${dataReform[i].facility} </td> 
        <td>${dataReform[i].city},  ${dataReform[i].state}</td>` 
        document.querySelector('table').appendChild(column)

        const city = dataReform[i].city


        fetch(`http://api.weatherapi.com/v1/current.json?key=c40ef9d8cf514de6aa6161333262409&q=${city}`)
        .then (res => res.json())
        .then (data => {
            console.log(data)

//plus equals is to help so the weather doestn rewrite itself 
        const weather = data.current.temp_f + "F"
        column.innerHTML += `<td>${weather}</td>`

        })
   
   
    }


    })
    .catch (error => {
        console.log (error )
    })
}