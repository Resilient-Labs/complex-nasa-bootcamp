document.querySelector('button').addEventListener('click',getFacility)


function getFacility(){
    const url1 = `https://cors.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`
    const num = document.querySelector('select').value

    fetch(url1)
    .then( res => res.json())
    .then (data => {
        //console.log(data)
        const dataFormat = JSON.parse(data.body)
        console.log(dataFormat)

        for (let i = 0; i<= num; i++){
            const column = document.createElement('tr')
            column.innerHTML = `<td>${dataFormat[i].facility}</td>
            <td>${dataFormat[i].city}, ${dataFormat[i].state}</td>`
            document.querySelector('table').appendChild(column)

            const city = dataFormat[i].city
            console.log(city)

            const url2 = `http://api.weatherapi.com/v1/current.json?key=e30a53993d2a4d31a47150206262309&q=${city}`
            fetch(url2)
                .then( res => res.json())
                .then (data => {
                    console.log(data)
                    console.log(data.current.temp_f)
                    const temp = data.current.temp_f
                    column.innerHTML += `<td>${temp}</td>`
                })
                .catch (err => {
                    console.log(`error ${err}`)
                });
        }
        

    
    })


    .catch (err => {
        console.log(`error ${err}`)
    });
}
    