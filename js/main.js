// CASS group worked together to do this project

document.querySelector('button').addEventListener('click', weather)

function weather(){

    let url = 'https://data.nasa.gov/resource/gvk9-iz74.json'
    fetch(url)
    .then(response => {
        console.log(response)
        return response.json()
    })
    .then(data =>{
        for(i=0; i<3; i++){
        let zipcode = data[i].zipcode
        let urlWeather =  `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},US&units=imperial&appid=7aa8a92b00737d0587f7ef9f7f7e33c7`
        fetch(urlWeather)
        .then(response => {
                console.log(response)
                return response.json()
                })
                .then(weatherdata =>{
                // document.querySelector('.temp').innerHTML+=`<h4>${data.main.temp}</h4>`
                // document.querySelector('.state').innerHTML+=`<h4>${data[i].state}</h4>`
                document.querySelector('.center').innerHTML+=`<h4>${data[i].center} </h4> <span>${data[i].state} </span> <span>${weatherdata.main.temp} Degrees </span> `
            console.log(data)
            })
        }
    })
}


