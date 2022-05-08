
document.querySelector('button').addEventListener('click', getLocation)

function getLocation(){
    let url = `https://data.nasa.gov/resource/gvk9-iz74.json`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for (let i = 0; i< data.length; i++){
                
                let p = data [i]

                let h2= document.createElement('h2')
                h2.innerText = 'City Name: ' + p.city
                document.querySelector('.locations').appendChild(h2)
                
                let h3 = document.createElement('h3')
                h3.innerText = 'Location: ' + p.state
                document.querySelector('.locations').appendChild(h3)

                let h4 = document.createElement('h4')
                h4.innerText = 'Facility Name: ' + p.facility
                document.querySelector('.locations').appendChild(h4)
                


                let lat = p.location.latitude
                let lon = p.location.longitude
                
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a6a0cc58b72b359df4c76fcb96240664`)
                    .then(res => res.json())
                    .then(weather => {
                        console.log('weather',weather)

                        let k= weather.main.temp
                        let temp = 1.8*(k-273) + 32

                        let h5 = document.createElement('h5')
                        h5.innerText= Math.floor(temp) + ' °F                        Fahrenheit'
                        h4.appendChild(h5)
                    })
                    .catch(err => {
                        console.log(`error ${err}`)
                    })
            }
        })
    }

