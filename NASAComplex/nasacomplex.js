// calls NASA Facility API- selected facility, city, and state
document.querySelector("button").addEventListener("click", function(){
  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json?$select=facility,city,state`)
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      response.forEach((data) => { // for each response, fetch weather for city and create new row in table with facility, city, state, and weather
        let table = document.querySelector('table')
        let tr = document.createElement('tr');
        let inputValue= data.city + ",US"  // gets NASA city and add default string US country code required by openweathermap

        if (data.city === "Wallops Island"){
          inputValue = "Hampton,US"
        }else if(data.city === "Stennis Space Center"){
          inputValue = "Jackson,US"
        }else if(data.city === "Moffett Field"){
          inputValue = "Sunnyvale,US"
        }else if(data.city === "Kennedy Space Center"){
          inputValue = "Orlando,US"
        }else if(data.city==="PASADENA"){
          data.city="Pasadena" // for display purposes
        } // some city locations are not valid cities, converting them to closest city to be accessed by openweathermap

        fetch("https://api.openweathermap.org/data/2.5/weather?q="+`${inputValue}`+"&appid=efde7c3602e51e82abca166b2b3c6a2c") // calls weather API for that facility's city
          .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
          .then(response => {
            let fahrenheit = (response.main.temp - 273.15) * 9 / 5 + 32 // converts K to Farenheit
            let temp = Math.ceil(fahrenheit) + "&#176;" + "F" // displays x degree symbol F

            tr.innerHTML = `<tr>
                   <td>${data.facility}</td>
                    <td>${data.city}</td>
                    <td>${data.state}</td>
                    <td>${temp}</td>
                    </tr>` // creates table elements. data = response from NASA, declared in forEach function

            table.appendChild(tr);

          })
          .catch(err => {
            console.log(`error ${err}`)
            alert("sorry, there are no results for your search")
          });
      })
    })
    .catch(err => {
      console.log(`error ${err}`)
      alert("sorry, there are no results for your search")
    });
});

//sets date to today's date
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth();
let yyyy = today.getFullYear();
let monthName
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
today = monthNames[mm] + ' ' + dd + ', ' + yyyy;
document.querySelector('.date').innerHTML = today
