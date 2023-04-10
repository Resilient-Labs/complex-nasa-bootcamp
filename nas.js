const locationInputed = document.querySelector("#input")
const hitButton = document.querySelector("button")
const showItems = document.querySelector("#list")

function locationFinder() {
    const url = ("https://data.nasa.gov/resource/gvk9-iz74.json")

    fetch(url)
        .then(res => res.json())
        .then(nasaData => {

            const addToDom = (facility) => {
                const {latitude: lat, longitude: lon} = facility.location
                const { facility: addr, city, state } = facility

                const listItem = document.createElement("li")
                listItem.innerText = `${addr}, ${city}, ${state}`;


                const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=825e3828e8d560f330f90e751147d7f3`

                fetch(url2)
                .then(res => res.json())
                .then(weatherData => {
                    console.log(weatherData)
                    if (weatherData?.main?.temp){
                        let kelvin = weatherData.main.temp
                        let f = (kelvin - 273.15) * 1.8 + 32
                        weatherData.innerText = (`temp ${Math.floor(f)}`)
                        listItem.innerText += ` \n The Temp Is : ${Math.floor(f)}`
                    }
                })

                showItems.appendChild(listItem)
            }
            nasaData.forEach(addToDom)
        })


}

hitButton.addEventListener("click",locationFinder)