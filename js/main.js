
    fetch ('https://data.nasa.gov/resource/gvk9-iz74.json')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            for(i=0; i < data.length; i++){
                console.log(data[i].center, data[i].city, data[i].state, data[i].zipcode)

                let centerLi = document.createElement('li')
                centerLi.innerText = data[i].center
                document.querySelector('.center').appendChild(centerLi)

                let locationLi = document.createElement('li')
                locationLi.innerText = `${data[i].city}, ${data[i].state} ${data[i].zipcode}`
                document.querySelector('.location').appendChild(locationLi)

                const zip = `${data[i].zipcode}`
                
                fetch(`https://api.weatherapi.com/v1/current.json?key=fcaf8e958e904ef1bf1191928220305&q=${zip}&aqi=yes`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)

                    let weatherLi = document.createElement('li')
                    weatherLi.innerText = `${data.current.temp_f}°`
                    document.querySelector('.weather').appendChild(weatherLi)
                    
                })
            }
            
            })
        .catch(err => {
            console.log(`error ${err}`)
        })
    
