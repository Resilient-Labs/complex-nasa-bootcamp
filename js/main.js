// alert('works')





document.querySelector('button').addEventListener('click', getData)

function getData(){

    const url1 = "https://cors.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json"

    const num = document.querySelector('select').value
    
    fetch(url1)
        .then(res => res.json())
        .then((data) =>{
            console.log(data)
    
            const dataParse = JSON.parse(data.body)
    
            console.log(dataParse)
    
            for (let i = 0; i <= num; i++){
                const column = document.createElement('tr')
                column.innerHTML = `<td>${dataParse[i].facility}</td>
                <td>${dataParse[i].city}, ${dataParse[i].state}</td>`
                document.querySelector('table').appendChild(column)
    
    
                const city = dataParse[i].city
    
    
                console.log(city)
    
                fetch(`http://api.weatherapi.com/v1/current.json?key=3dcf461bd3014d44987132320260210&q=${city}&aqi=no`)
                    .then (res => res.json())
                    .then (data =>{
                        console.log(data)
                        console.log(data.current.temp_f)
                        const weather = data.current.temp_f
                        column.innerHTML += `<td>${weather}</td>`
                    })
            }
        })
        .catch(error => {
            console.log(error)
        })

}