document.querySelector("#submit").addEventListener('click',getData)

function getData() {
let url = "https://data.nasa.gov/resource/gvk9-iz74.json"
fetch(url)
    .then(res => res.json())
    .then(data => {
    console.log(data)
    for(let i = 0; i < 400 ;i++){
        console.log(data[i].name)
         let facility =  data[i].center
         let latitude = data[i].location.latitude
         let longitude = data[i].location.longitude
         console.log(facility)
         console.log(latitude)
         console.log(longitude)
            let url2 = "http://api.weatherapi.com/v1/current.json?key=40c9a98566674bdfa50150132221510&q=${latitude}&q=${longitude}`"
            fetch(url2)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            let weather = data.current.condition.text
                console.log(weather)
            var ul = document.querySelector('ul')
            var li = document.createElement('li')
            li.innerText = `${facility} | ${latitude} | ${longitude} | ${weather}`
                ul.appendChild(li)
                    console.log(ul.appendChild(li))
 })
.catch(err => { 
    console.log(`error ${err}`)
})
}
})
.catch(err => { 
    console.log(`error ${err}`)
})
}
