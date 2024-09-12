
/* Goal: Use NASA's API to return all of their facility locations (~400). 
    Display the name of the facility, its location, and the weather at the facility currently. */


document.querySelector('button').addEventListener('click', getLocation)
let showTable = false 
document.querySelector('table').style.display = 'none' //To have table not show up when page loads

function getLocation() {
    showTable = true
    if(showTable){
        document.querySelector('table').style.display = 'block' //To have table show when the function is executed
    }

    let selection = document.querySelector('select').value
    console.log(selection)
    fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)

            for (let i = 0; i < selection; i++) { 

                let lat = data[i].location.latitude
                let lon = data[i].location.longitude

                let row = document.createElement('tr')
                row.innerHTML = `
            <td>${data[i].facility}</td>
            <td>${data[i].city}</td>
            <td>${data[i].state}</td>
            `
                document.querySelector('table').appendChild(row)

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c3476a38c512d87355af556898bcf650`)
                    .then(res => res.json()) // parse response as JSON
                    .then(data => {
                        let temp = (Math.floor(data.main.temp - 273.15) * 9/5 + 32 + '℉')
                        console.log(data)
                        row.innerHTML += `
                        <td>${temp}</td>
                        `

                    })
                    .catch(err => {
                        console.log(`error ${err}`)
                    });

            }

        })
}




//Special thanks to Rio! 



