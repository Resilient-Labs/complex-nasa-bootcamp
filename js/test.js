

//listener
document.querySelector("#submit").addEventListener("click", pushData)
let city = []
let country = []
function pushData(event) {
    //stop form submission
    event.preventDefault()
    //Step 1: fetch Nasa data 
    fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("NETWORK RESPONSE ERROR")
        }
    })
    .then(data => {
        for (i=0;i<data.length;i++){
                console.log(data)
                city = data[i].city
                country = data[i].country
                console.log(city)
                const main = document.querySelector(".main")
                const section = document.createElement("section")
                const area = document.createElement("ul")
                main.appendChild(section)
                // section.appendChild(ma)
                section.appendChild(area)
                const lineForFacility = document.createElement("li")
                const lineForCity = document.createElement("li")
                const lineForStatus = document.createElement("li")
                const lineForPhone = document.createElement("li")
                area.appendChild(lineForFacility)
                area.appendChild(lineForCity)
                area.appendChild(lineForStatus)
                area.appendChild(lineForPhone)
                lineForFacility.innerHTML += data[i].facility
                lineForCity.innerHTML += " " + data[i].city + "," + data[i].state 
                if (data[i].status === "Active" || data[i].status === "Unactive") {
                     lineForStatus.innerHTML += data[i].status
                }
                else {
                    lineForStatus.innerHTML += "Status unknown"
                }
                lineForPhone.innerHTML += data[i].phone
             //Step 1: Repeat everything below
                //Inspired by Elvin to use a weather api 
                //Step 3: Fetch from Weather API
                let key = config.MY_API_TOKEN
                fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&q=${country}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("NETWORK RESPONSE ERROR")
                    }
                })
                .then(dataTemp => {
                        console.log(dataTemp)
                        console.log(dataTemp.current.temp_f)
                        temp = document.createElement("li")
                        area.appendChild(temp)
                        temp.innerHTML = "Temp: "+ dataTemp.current.temp_f
                })
                .catch(err => {
                    console.log(`error ${err}`)
                })
               
             }

    })
    .catch(err => {
        console.log(`error ${err}`)
    })


    //define variables
 
    
}

