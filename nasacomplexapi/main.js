document.querySelector('button').addEventListener('click', getLocation)


function getLocation() {

    fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
        .then(res => res.json())
        .then(data => { // location = response object w/ array
            console.log(data[0])

            for (let i = 0; i <= data.length -1 ; i++) {
                // change to i <= 5 so api key doesnt get blocked dut to data.length being 485
                let p = data[i]

                let h2 = document.createElement('h2')
                h2.innerText = 'City Name: ' + p.city
                document.querySelector('.locations').appendChild(h2)

                let h3 = document.createElement('h3')
                h3.innerText = 'State: ' + p.state
                document.querySelector('.locations').appendChild(h3)

                let h4 = document.createElement('h4')
                h4.innerText = 'Facility Name: ' + p.facility
                document.querySelector('.locations').appendChild(h4)

                let lat = p.location.latitude
                let lon = p.location.longitude

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=847021155f44f4ea4d76940a65f96f55`)
                    .then(res => res.json())
                    .then(weatherData => {
                        console.log(weatherData)

                        let k = weatherData.main.temp 
                        let temp = 1.8*(k-273) + 32

                        let h5 = document.createElement('h5')
                        h5.innerText = Math.floor(temp) + ' Degrees Farenheit'
                        h4.appendChild(h5)

                    })
                    .catch(err => {
                        console.log(`error ${err}`)
                    })
            }
        })
}