// Goal: Use NASA's API to return all of their facility locations (~400). 
// Display the name of the facility, its location, and the weather at the facility currently.

document.querySelector('.button').addEventListener('click', getFetch)

function getFetch(){
    let url = `https://data.nasa.gov/resource/gvk9-iz74.json`

    fetch(url)
        .then(res => res.json()) //parse response as JSON
        .then(data => {
            console.log(data)
            for (let i = 0; i < 400; i++){
                let lat = data [0].location.latitude
                let lon = data [0].location.longitude
                let fName = data [0].facility
                document.querySelector('h2').innerText = data.coord
                const info = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2226f0ff2dad386c13a59f94f32cf421`
                fetch(info)
                    .then(res => res.json())
                    .then(info => {
                         console.log(info)
                        let text = document.querySelector('p')
                         text.innerText = `${info.weather} in ${fName}`
                        document.querySelector('.location').appendChild(text)
                    })
            }

        //.catch((err) => console.error(err))
})
    }
//   document.querySelector('.location').appendChild(text)
