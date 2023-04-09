
// create a function inside two fetches one is gonna be for nasa's locations
// create a for loop is gonna display all the location of nasa 
// console log the data to see where and how to find the data of the locations
// convert kelvins to f using the math.floor method
// create a another promise so when you look for the location is gonna give you the temperature in that zone 
//call the function at the end so makes it work
function nasaLoc() {
    fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            for (let i = 0; i <= 400; i++) {

                let facilityNasa = data[i].facility
                let centerNasa = data[i].center

                let lat = data[i].location.latitude
                let lon = data[i].location.longitude
                let country = data[i].country
                let state = data[i].state
                
                

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=76cdbae952e035864405714b8200419f`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        let convertTempe = Math.floor((data.main.temp - 273.15) * 1.8 + 32)
                        let li = document.createElement('li')
                        document.querySelector('h2').appendChild(li)
                        li.innerText = ` Facility: ${facilityNasa} Center: ${centerNasa} Country: ${country} State:${state} Temperature: ${convertTempe}℉ `
        
                    })



                    .catch(err => {
                        console.log(`err ${err}`)
                    }
        )}    

        })
}
nasaLoc()
