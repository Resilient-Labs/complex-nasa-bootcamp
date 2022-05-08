// Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.

function returnData() {
    fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].center)

                let listText = document.createTextNode(data[i].center)
                let li = document.createElement('li')

                li.appendChild(listText)
                document.querySelector('ul').appendChild(li)

                fetch(`http://api.weatherapi.com/v1/current.json?key=bd74c761729d46fe81a03455212909&q=${data[i].city}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data.current)
                        let spanText = document.createTextNode(`${data.current.condition.text} and ${data.current.temp_f}F`)
                        let span = document.createElement('span')

                        span.appendChild(spanText)
                        let listElements = document.querySelectorAll('li')
                        listElements[i].appendChild(span)
                    })
                    .catch(err => {
                        console.log('error')
                    })
            }
        })
        .catch(err => {
            console.log('error')
        })
}

returnData()