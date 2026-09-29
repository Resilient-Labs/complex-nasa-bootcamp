console.log('Hello World')
//Input for location by state? - https://data.nasa.gov/docs/legacy/gvk9-iz74.json
// Place to see all of them


document.querySelector('button').addEventListener('click', getWeather)

function getWeather(){
    const url = "https://cors.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json"
    let number = document.querySelector('select').value
    
    fetch(url)
        .then(res => res.json())
        .then((data) => {
        console.log(data)
        
       const dataReform = JSON.parse(data.body)
       console.log(dataReform)

        for(let i = 0; i <= number; i++){

            const column = document.createElement("tr")
            
            column.innerHTML=`<td>${dataReform[i].facility}</td>
            <td>${dataReform[i].city} , ${dataReform[i].state}</td>`
            document.querySelector('table').appendChild(column)
    
            const city = dataReform[i].city
            
            fetch(`http://api.weatherapi.com/v1/current.json?key=bc64d6b0e6d8470a841155228262309&q=${city}&aqi=no`)
             .then(res => res.json())
             .then((data) => {
                console.log(data)
                console.log(data.current.temp_f)

                const sky = data.current.condition.text
                const weather = data.current.temp_f + "℉"

                column.innerHTML += `<td>${weather} , ${sky}</td>`

            })

        }

        })
        .catch(error => {
            console.log(error)
        })

}

