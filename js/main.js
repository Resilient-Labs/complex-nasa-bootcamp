const facilityInfo = document.querySelector('#facilityInfo')

    fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
    .then(res => res.json())
    .then(data => {
        console.log(data)

            //for each array, make a ul
            //within that ul, append the facility, city, and temp
            //append the ul to the facilityInfo
            data.forEach( element => {

                const ul = document.createElement('ul')
                const facilityLocationLi = document.createElement('li')
                const cityLi = document.createElement('li')
    
                facilityLocationLi.innerText = `NASA Facility: ${element.facility}`
                cityLi.innerText = `City/State: ${element.city}, ${element.state}`
    
                ul.appendChild(facilityLocationLi)
                ul.appendChild(cityLi)           

        fetch(`https://api.weatherapi.com/v1/current.json?key=21a89595fe534aa5b54173954241710&q=${element.location.latitude},${element.location.longitude}&aqi=no`)
        .then(res => res.json())
        .then(data2 => {

            const locationTemp = data2.current.temp_f
            const locationTempContainer = document.createElement('li')

            locationTempContainer.innerText = `Temperature: ${locationTemp} F`
            ul.appendChild(locationTempContainer)
            facilityInfo.appendChild(ul)

        } )

        })
    
    })
    .catch(err => {
        console.log(`error ${err}`)
    })








