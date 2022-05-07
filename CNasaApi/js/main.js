// <!-- Shoutout to Dennis for taking the time to walk through some steps he learned. I still think I'm going to give a table a try in a seperate folder->
document.querySelector('button').addEventListener('click', getNasaFacilities)

function getNasaFacilities(){
    let url = `https://data.nasa.gov/resource/gvk9-iz74.json`
    
    fetch(url)
    .then(res => res.json()) 
    .then(data => {
        console.log(data)
        // GET DATA

        let ol = document.querySelector('ol')
        for(let i = 0; i < data.length; i++){

            let city = data[i].city
            let state = data[i].state

            // let states = data[i].state

            let weather = `https://api.weatherapi.com/v1/current.json?key=493848bb4ef445c6b3120948220405&q=${city}&${state}`

            fetch(weather)
            .then(res => res.json()) 
            .then(dataOfW =>{
                
                let weatherProp = `${data[i].center} || ${data[i].facility} || ${city}, ${state} || ${dataOfW.current.temp_f} °F`

                // or  `Center Name: ${data[i].center} 
                // Facility Name: ${data[i].facility} 
                // City/State: ${city}, ${state} 
                // Current Weather: ${dataOfW.current.temp_f} °F`
                // string of what should show

                let li = document.createElement('li')

                li.innerText = weatherProp

                ol.appendChild(li)
                
            })
            .catch(err => { 
                console.log(`error ${err}`) 
                alert('Error')
            });

        }

        
    })
    .catch(err => { 
        console.log(`error ${err}`) 
        alert('Error')
    });
// look at object propery and ger city, center, state
}