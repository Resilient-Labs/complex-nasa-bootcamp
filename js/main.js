let apiKey = '04d38a269b124b12b7b810cc1df607bb'

fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
.then(res => res.json()) // parse response as JSON 
.then(data => { 

//This loop removes the NASA facilities that share the same center, since those facilities would have the same temperature
    let arr = []
    let arr2 =[]
    for (let i = 0; i < data.length - 1; i++){ 
        if (!arr.includes(data[i].center)){
            arr.push(data[i].center)
            arr2.push(data[i])
        }
    }
    //Alphabetize the centers by name
    arr2.sort((a,b) => a.center.localeCompare(b.center))


/*
    //If you want to see all 485 facilities, uncomment the following code block & line 38. Comment out line 37 & lines 8-17
        let arr2 =[]
        for (let i = 0; i < data.length - 1; i++){ 
            arr2.push(data[i])
        }

        //Alphabetize the centers by name
        arr2.sort((a,b) => a.facility.localeCompare(b.facility))
*/


//Create and append the list items to the DOM
    let list = document.querySelector('ul')
    arr2.forEach((item) => {
    let listItems = document.createElement('li')
    listItems.addEventListener('click', getZipcode)
    listItems.innerText = `🚀 ${item.center}, ${item.city}, ${item.state}`
    //listItems.innerText = `🚀 ${item.facility}, ${item.center}, ${item.city}, ${item.state}`
    list.appendChild(listItems)

    //some zipcodes are 10 digits. Our weather API doesn't recognize those. Remove them
    if (item.zipcode.length >5){
        listItems.value = item.zipcode.slice(0,5)
    } else{
        listItems.value = item.zipcode
    }  
})


    function getZipcode(e){
        let zip = e.target.value
        getTemp(zip)
    }

})

.catch(err => { 
    console.log(`error ${err}`) 
})



//Weather API

function getTemp(zip){

    fetch(`https://api.weatherbit.io/v2.0/current?key=${apiKey}&units=i&postal_code=${zip}&country=US`)
    .then(res => res.json()) // parse response as JSON 
    .then(info => { 

        console.log(info)
        document.querySelector('#city').innerText = `${info.data[0]['city_name']}, ${info.data[0]['state_code']}`
        document.querySelector('#description').innerText = `${info.data[0].weather.description}`
        document.querySelector('#farenheit').innerText = `${info.data[0].temp} °F`
        document.querySelector('#precip').innerText = `${info.data[0].precip} %`
        document.querySelector('#uv').innerText = `${Math.round(info.data[0].uv)}`
        document.querySelector('#humidity').innerText = `Humidity: ${info.data[0].rh} %`
        document.querySelector('#pressure').innerText = `Pressure: ${info.data[0].pres}°`
        document.querySelector('#windSpeed').innerText = `Wind: ${info.data[0]['wind_spd']} mph`

    })

    .catch(err => { 
        console.log(`error ${err}`) 
    })

}   