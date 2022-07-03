// Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.

function returnData() {
    fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                console.log(data.length)

                let stationName = document.createTextNode(data[i].center)
                let li = document.createElement('li')

                li.appendChild(stationName)
                
                document.querySelector('ul').appendChild(li)

                fetch(`http://api.weatherapi.com/v1/current.json?key=f2a2c0355c0e436db46231502220207&q=${data[i].city}`)
                    .then(res => res.json()) 
                    .then(data => {
                        
                        console.log(data.current)
                        
                        let weatherTemp = document.createTextNode(`${data.current.condition.text} and ${data.current.temp_f}f`)
                        let span = document.createElement('span')

                        span.appendChild(weatherTemp)
                        let listElements = document.querySelectorAll('li')
                        listElements[i].appendChild(span)
                    })
                    
            }
        })
        .catch(err => {
            console.log('error')
        })
}

returnData() 