// const date = "2020-08-11T15:51:23.377Z"
// console.log(date.split('').slice(0,10).join(''))

// fetch('http://history.openweathermap.org/data/3.0/history/locations/create?lat=100&lon=100&appid=07bd0667aa7c8ad3df11232e06fdbcb5')
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)
//             })
//             .catch(err => {
//                 console.log(`error ${err}`)
//         });

//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

document.querySelector('button').addEventListener('click', getDate)

function getDate() {
    let day = document.querySelector('input').value
            
    const url = `https://api.nasa.gov/planetary/apod?api_key=a2LI4tojUOwvBM6BhEWa3cx6ZzIeLzkfdTuwV5FL&date=${day}`

    const name = document.querySelector('#stars')
    const image = document.querySelector('img')
    const frame = document.querySelector('iframe')
    const desc = document.querySelector('#description')
    
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        name.innerText = data.title
        desc.innerText = data.explanation
        if ( data.media_type === "image") {
            image.style.display = 'block'
            image.src = data.hdurl
            frame.style.display = 'none'
        } else if ( data.media_type === "video") {
            frame.style.display = 'block'
            frame.src = data.url
            image.style.display = 'none'
        } else {
            alert('Media Not Supported')
        }

        fetch('https://data.nasa.gov/resource/gvk9-iz74')
        .then(res => res.json()) // parse response as JSON
        .then(data => {
        console.log(data)
        const random = Math.floor(Math.random() * data.length)
        const nasaLat = data[random].location.latitude
        const nasaLon = data[random].location.longitude
        const spaceName = data[random].center
        console.log(data[random].center)
        const urlTemp = `https://api.openweathermap.org/data/2.5/weather?lat=${nasaLat}&lon=${nasaLon}&appid=f4221edf930e3945b38a5e8c64554341`
        fetch(urlTemp)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                document.querySelector('.temp').innerText = Math.round(1.8 * ((data.main.temp) -273.15) + 32)
                document.querySelector('.location').innerText = data.name
                data.weather[0].description
                document.querySelector('.nasa').innerText = spaceName
                document.querySelector('.weather').innerText = data.weather[0].description
            })
            .catch(err => {
                console.log(`error ${err}`)
        });

        })
        .catch(err => {
        console.log(`error ${err}`)
        });


    })
    .catch(err => {
        console.log(`error ${err}`)
});
}



