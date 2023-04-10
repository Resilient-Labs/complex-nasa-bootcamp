let btn = document.querySelector('button')
let url = `https://data.nasa.gov/resource/gvk9-iz74.json`

btn.addEventListener('click', getFacility)

function getFacility(){


    fetch(url)
    .then(res => res.json()) //get json
    .then(data =>{
        data.forEach(facilityInfo => {
            let facilityName = facilityInfo.facility
            let facilityZip = facilityInfo.zipcode
            let url2 = `http://api.weatherapi.com/v1/current.json?key=3559e27283e9401dbd2175933230504&q=${facilityZip}`
            
            
            fetch(url2)
            .then(res => res.json()) //get json
            .then(data =>{
                let facilityLocation = data.location.region
                let facilityTemp = data.current.temp_f
                
                let li = document.createElement('li')
                li.innerText = `The ${facilityName} Facility In ${facilityLocation} is ${facilityTemp} Degrees Fahrenheit`
                let ul = document.querySelector('ul')
                ul.appendChild(li)
        
                
        
            })

        })

    })

}