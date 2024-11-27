    fetch('https://dragon.best/api/glax_weather.json?location=&lon=46.9481&lat=7.4474&units=imperial&forecast=on')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.current.temperature)
            })
            .catch(err => {
                console.log(`error ${err}`)
            })
    
    