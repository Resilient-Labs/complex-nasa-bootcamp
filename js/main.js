

document.querySelector('#return').addEventListener('click', nasaLocations)

function nasaLocations() {
    const url = `https://cors.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            const centerResults = document.querySelector('#display')
            const getData = JSON.parse(data.body)

            //First API

            getData.forEach(result => {
                //establishing the secton for each piece of piulled data
                const centerSection = document.createElement('section')
                centerSection.classList.add('center-card')


                //creating the eleents as we pull them from the DOM
                const centerHeading = document.createElement('h3')
                centerHeading.innerText = result.center

                const city = document.createElement('p')
                city.innerText = 'City: ' + result.city

                const state = document.createElement('p')
                state.innerText = 'State: ' + result.state

                const zipcode = document.createElement('p')
                zipcode.innerText = 'Zip Code: ' + result.zipcode


                //appending the created & pulled elements to its section 
                centerSection.appendChild(centerHeading)
                centerSection.appendChild(city)
                centerSection.appendChild(state)
                centerSection.appendChild(zipcode)

                //appending each piece of data to its individual section
                centerResults.appendChild(centerSection)

                let lat = result.location.latitude
                let long = result.location.longitude

                //Second API

                const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=apparent_temperature&temperature_unit=fahrenheit`

                fetch(url2)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)

                        const temp = document.createElement('p')

                        temp.innerText = 'Feels Like: ' + data.current.apparent_temperature + '°F'

                        centerSection.appendChild(temp)
                    })
            });
        })
        .catch(error => {
            console.error(error)
        })
}
