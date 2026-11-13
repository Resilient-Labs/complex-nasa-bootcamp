//Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.

//Project: After pressing the button, view all ~400 NASA facilities and the weather. Use the NASA facilities API to print all facilities to the DOM. Use a weather app api to print the weather for each respective facility.

//Logic:  We need to use two APIs!

document.querySelector('button').addEventListener('click', getData)

function getData(){
    //included cors correction by copy/pasting 'https://cors.io/?url=' in front of API url
    const url1 = "https://cors.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json"

    const num = document.querySelector('select').value //This variable is referencing how many of the data we will print to the DOM will show up at a time

    fetch(url1)
        .then(res => res.json())
        .then((data) =>{
            console.log(data)

            const dataParse = JSON.parse(data.body) //An additional cors fix so that the JavaScript values can be read and understood as JSON by computer

            console.log(dataParse)
            //here we loop through the array of data (485 NASA locations and their info)
            for (let i = 0; i <= num; i++){
                const column = document.createElement('tr') //here we create new elements 
                column.classList.add('newColumns') //attempt to add css to newly created elements

                column.innerHTML = `<td>${dataParse[i].facility}</td>
                <td>${dataParse[i].city},  ${dataParse[i].state}</td>` //here we're pulling the NASA facilties, city, and state 
                document.querySelector('table').appendChild(column) //adding new 'tr' elements to the end of the table

                const city = dataParse[i].city 

                console.log(city)
                
                fetch(`http://api.weatherapi.com/v1/current.json?key=500dc77b4c3c4c9faef75907262309&q=${city}&aqi=no`)
                    .then (res => res.json())
                    .then ((data) =>{
                        console.log(data)
                        console.log(data.current.temp_f)
                        const weather = data.current.temp_f + " °F"
                        column.innerHTML += `<td>${weather}</td>`
                    })
            }
        }) 
        .catch(error => {
            console.log(error)
        })
}