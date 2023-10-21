


// convert kelvins to f using the math.floor method
// create a another promise so when you look for the location is gonna give you the temperature in that zone
//call the function at the end to make it work
const listInfo = document.querySelector('#locationInfo')
document.querySelector('button').addEventListener('click', nasaLocations)


function nasaLocations() {
    const dataUrl = 'https://data.nasa.gov/resource/gvk9-iz74.json'
    fetch(dataUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            for (let i = 0; i <= 485; i++) {
                //everything but the kitchen sink in terms of location. for loop to loop through all nasa data objects as Ellie had suggested.
                let city = data[i].city
                let state = data[i].state
                let country = data[i].country
                let zipcode = data[i].zipcode
                let latitude = data[i].location.latitude
                let longitude = data[i].location.longitude
                let nasaFacility = data[i].facility
                let nasaCenterName = data[i].center


                const apiKey = '74bcf528a4084cd0caf71c9314c6a0c2'
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
                    .then(res => res.json())
                    .then(info => {
                        console.log(info)
                        console.log(info.main.temp) //just checking to make sure I have temp and am pulling it from correct object.
                        let temp = Number.parseFloat((info.main.temp - 273.15) * 1.8 + 32).toFixed(1)//conversion to F from Kelvins to the first decimal using parseFloat

                        //create newLi with text input from object properties chosen in template literals//
                        let newLi = document.createElement('li')
                        newLi.appendChild((document.createTextNode(`NASA Center: ${nasaCenterName}, NASA Facility: ${nasaFacility}, Location: ${city}, ${state}, ${country}, ${zipcode}, Current Temperature: ${temp} degrees F`)))

                        //append those new lis to appear inside the ul//
                        listInfo.appendChild(newLi)



                    })
            }
        })
        .catch(err => {
            console.log(`err ${err}`)
        })
}
