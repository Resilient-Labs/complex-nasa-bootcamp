document.querySelector('button').addEventListener('click', getDate)


//Tiago helped me a bunch with this, this was the first complex api I worked on //
function getDate(){
    let url =   `https://data.nasa.gov/resource/gvk9-iz74.json`
    fetch(url)     
        .then(res => res.json()) 
    // parse response as JSON     
        .then(data => {       
            console.log(data)     
            for(let i=0;i<data.length; i++) {
                let nasaLocations = document.querySelector('.nasaLocations')
                let location = data[i].center
                let zipCode = data[i].zipcode
                let state = data[i].state
                let country = data[i].country
                let urlTwo =`http://api.weatherapi.com/v1/current.json?key=1bf5be0f357c4fb3942185220220305&q=${zipCode}&aqi=no`
                fetch(urlTwo)     
                    .then(res => res.json()) 
                    .then(data => {       
                    console.log(data)     
                    let li = document.createElement('li')
                    li.innerText = `${location} is ${data.current.temp_f} degrees farenheit in ${state}, ${country}.`
                    nasaLocations.appendChild(li)
            })
        .catch(err => {         
        console.log(`error ${err}`)     
        });     
    }}
    )     

    .catch(err => {         
    console.log(`error ${err}`)     
    }); 
}