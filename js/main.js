//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/



// get nasa facility api
// when button is clicked , it will show the data.center
// weather api 
// when button is clicked , it will show the weather at the facilty location
// for loop locate all the cities 


document.querySelector('button').addEventListener('click', getCity)

let ul = document.querySelector("ul")

// function getWeather(selection) {

//   let url = `http://api.weatherapi.com/v1/current.json?key=0b646e2729b448cfa50174606230404&q=${selection}`

//   fetch(url)
//     .then(res => res.json()) // parse response as JSON 
//     .then(data => {
//       console.log(data)
//       let temp = data.current.temp_f
//       return temp

//     })
//     .catch(err => {
//       console.log(`error ${err}`)
//     });



// }

function getCity() {


  ul.innerHTML=''
  let urlTwo = 'https://data.nasa.gov/resource/gvk9-iz74.json'
  fetch(urlTwo)
    .then(res => res.json()) // parse response as JSON 
    .then(data => {
      console.log(data)
      //when working replace 1 with data.length
      for (let i = 0; i < data.length; i++) {  
        let city = data[i].zipcode
        let facilityName = data[i].facility
        console.log(city, facilityName)
        let url = `http://api.weatherapi.com/v1/current.json?key=0b646e2729b448cfa50174606230404&q=${city}`

        fetch(url)
          .then(res => res.json()) // parse response as JSON 
          .then(weatherTemp => {
            console.log(weatherTemp)
            let temp = weatherTemp.current.temp_f
            let state = weatherTemp.location.region
            let city = weatherTemp.location.name
            let condition = weatherTemp.current.condition.text
            let li = document.createElement('li')
            li.innerText = `The facilty ${facilityName} is located in ${city}, ${state}. The current temperature is now ${temp} °F and is ${condition}.`
            ul.appendChild(li)

          })
          .catch(err => {
            console.log(`error ${err}`)
          })
      }

    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}


