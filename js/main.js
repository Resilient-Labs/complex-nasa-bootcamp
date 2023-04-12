let url = "https://data.nasa.gov/resource/gvk9-iz74.json"
let ul = document.querySelector("ul")
document.querySelector("button").addEventListener("click", getCity)

function getCity() {
    ul.innerHTML = " "
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(facilityInfo => {
                let facilityName = facilityInfo.facility
                let facilityZipcode = facilityInfo.zipcode

                let url = `http://api.weatherapi.com/v1/current.json?key=8a6cf086af094c68b4d174031230404&q=${facilityZipcode}`

                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        let temp = data.current.temp_f
                        let city = data.location.name

                        let li = document.createElement('li')
                        li.innerText = `At ${facilityName} in ${city} city, the temeprature is ${temp}F`
                        ul.appendChild(li)
                    })
                    .catch(err => {
                        console.log(`error ${err}`)
                    })

            })
        })
}
