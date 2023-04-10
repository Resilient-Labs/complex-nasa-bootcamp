//worked on this with Seth, Akeem and Jessica.


const button = document.querySelector('button') //declared two variable with two query selectors one if the button and the other one is the ul
const showItem = document.querySelector('#lista')

let apiKey = `09b52f091e4cf3615a7ba0bef1454456`

function getPlace() {


  const url = (`https://data.nasa.gov/resource/gvk9-iz74.json`)

  fetch(url) // we are asking for the response from the URL
    .then(res => res.json()) //we want the information to be displayed/translated in jason 
    .then(facilityInfo => { //facilityInfo and then use a right arrow function

      const addtoDom = (facility) => { //facilities is the array 
        //this is distructures and here are basically unpacking values from the arrays of information coming from the URL
        const { latitude: lat, longitude: lon } = facility.location // we have facility.location because we need to get to the facility array first to get to the location array.
        const { facility: address, city, state } = facility

        const listItem = document.createElement('li')
        //declaring another variable for the Lists because later on we will be appending a list Item to the UL in the HTML
        listItem.innerText = `${address}, ${city}, ${state}`
       //each list that is created from the data is going to show an inner text for each one of the template literal.
        const urltwo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        // second URL is always on top of the fetch

        fetch(urltwo)
        .then(res => res.json())
        .then(weatherData => {
          console.log(weatherData)
          if (weatherData?.weather?.[0]?.description) {
            const weatherDesc = weatherData.weather[0].description // Get the weather description from the API response
            weatherListItem.innerText = `Weather: ${weatherDesc}` // Set the weather description text
            listItem.appendChild(weatherListItem)
          }
          if (weatherData?.main?.temp) /*this acts as a if else statement but is also a truthy or falsy*/{
            let k = weatherData.main.temp // creating a variable for that we coul assign to the information that is being fetched.
            let f = (k - 273.15) * 1.8 + 32 //convert kelvin into fahrenheits 

            weatherData.innerText = (`temp ${Math.floor(f)}`)
            listItem.innerText += ` Temp: ${Math.floor(f)}`
          }
        })
        showItem.appendChild(listItem)
        //
      }
      facilityInfo.forEach(addtoDom)
      // console.log(facilityInfo)
      // document.querySelector('#name').innerText = facilityInfo[0].center
      // document.querySelector('#location').innerText = facilityInfo[0].state

      // let lat = facilityInfo[0].location.coordinates
      // let lon = facilityInfo[1].location.coordinates

  


          // console.log(weatherdata)
          // document.querySelector('#weather').innerText = (`temp ${Math.floor(f)}`)
        })
      // list.appendChild(list)
      .catch(err =>{
        console.log(`error`)

    })
}
document.querySelector('button').addEventListener('click', getPlace)