//you want NASA locations and weather
const showItems = document.querySelector('#list')
const selectBttn = document.querySelector('button').addEventListener('click', zipCodeFinder)

function zipCodeFinder(){
    let url = `https://data.nasa.gov/resource/gvk9-iz74.json`
    fetch(url)
        .then(res => res.json()) // parse response as JSON 
        .then(nasaData => {
            const placeInDom = (facility) => {
                console.log(facility)
                //renames variable
                const {latitude: lat, longitude: lon} = facility.location
                const {facility: addr, city, state} = facility
                
                //same as appending the child li 
                const listItem = document.createElement('li')
                //gets text side by side
                listItem.innerText = `${addr}, ${city}, ${state}`
                
                
                const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5cc27156d7dc5dc09ca2664556604c20`
                //promise- grabbing url
                fetch(url2)
                //response being formatted to json
                .then(res => res.json()) //parse response as JSON 
                //turns into object that can be manipulated
                .then(weatherData => {
                    console.log(weatherData)
                        //if all exist run
                        if(weatherData?.main?.temp){
                        let kelvin = weatherData.main.temp
                        let fahrenheit = Math.floor((kelvin - 273.15) * 1.8 + 32)
                        //adds to listItem variable into DOM
                        listItem.innerText += `Temp: ${fahrenheit}°F`
                    }
                    showItems.appendChild(listItem)
                    throw new Error('stop the loop')
                })
            }       
        nasaData.forEach(placeInDom)
    })

}
