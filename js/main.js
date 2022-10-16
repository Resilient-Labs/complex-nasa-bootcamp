//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

// get input to equal name of facility in dom
// if facility name and what is input is the same use the lat and lon for other

document.querySelector('button').addEventListener('click', gimmeLocations)

function gimmeLocations(){

    let url = `https://data.nasa.gov/resource/gvk9-iz74.json`
    
    
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for(let i = 0; i < data.length; i++){
            let here = document.querySelector('ol')
            let place = data[i].center
            let zip = data[i].zipcode
            let country = data[i].country
            let state = data[i].state
            let facility = data[i].facility
            let 番号 = `http://api.weatherapi.com/v1/current.json?key=291870e420f841d891d21103220905&q=${zip}&aqi=no`
            fetch(番号)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let li = document.createElement('li')
                li.innerText = `The ${place}/${facility} is cuurently ${data.current.temp_f} and is in ${state},${country}.`
                here.appendChild(li)

            })



        }

    })
    .catch(err =>{
        console.log(`error ${err}`)
    })
}