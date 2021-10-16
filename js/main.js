// Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently. 

fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(res => res.json())
    .then(data => {
        for(i=0; i < data.length; i++){
            //checking data location
            console.log(data[i].facility, data[i].city, data[i].state)
            //grabbing facility name
            let facilityLi = document.createElement('li')
            facilityLi.innerText = data[i].facility
            document.querySelector('#facility').appendChild(facilityLi)
            //grabbing location (city, state)
            let locationLi = document.createElement('li')
            locationLi.innerText = `${data[i].city}, ${data[i].state}`
            document.querySelector('#location').appendChild(locationLi)
            //Storing the city and state to use to find the current weather at the location (will always be a state because NASA facilities are always in the US)
            const zip = data[i].zipcode.substring(0, 5)
            const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${key}`
            //grabbing temperature using another API
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    //checking to make sure all info is correctly grabbed
                    console.log(data.main.temp)
                    let tempLi = document.createElement('li')
                    tempLi.innerText = data.main.temp + '\u00B0F'
                    document.querySelector('#weather').appendChild(tempLi)
                })
                .catch(err => {
                    console.log('error')
                })
                }
            })
    .catch(err => {
        console.log('error')
    })
