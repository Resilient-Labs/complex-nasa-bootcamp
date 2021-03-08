//worked with house hayden: jasmin, kiany, guth, davida, kevin and eden

document.querySelector("button").addEventListener("click", getInfo)

function getInfo() {
    fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
        .then(res => res.json())
        .then(data => {
            data.forEach((obj) => {
            // response needs to returns as array/list all facities to show
            // needs to incorporate ol and li 
            const list = document.querySelector("ol")
            const statement = document.createElement("li")
            //looking for latitude, longitude, the namethe center, city and country
            //given that 
            let coordLong = obj.location.longitude
            let coordLat = obj.location.latitude
            let nameofLocation = obj.center
            let city = obj.city
            let country = obj.country

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordLat}&lon=${coordLong}&APPID=a5387c6cf57752657d32cdebecedb26d`)
                .then(res => res.json())
                .then(data => {
                let tempK = data.main.temp
                //convert tempearture to kelvinfahrenheit
                let tempF = Math.round((tempK-273.15)*(9/5)+32)
                //by adding 'statement' this will create a list on to the browser once the button has been activated
                //#8457 -- symbol for degree in F
                console.log(tempF)
                statement.innerHTML = `${nameofLocation}, ${city}, ${country}, ${tempF}&#8457`
                //this adds li to ol 
                list.appendChild(statement)
                })
                .catch(err =>{
                console.log(`error ${err}`)
                //alert("sorry, there are no results for your search")
                })
            }
        )
        })
    .catch(err => {
    console.log(`error ${err}`)
   // alert("sorry, there are no results for your search")
    })
}
