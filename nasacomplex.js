document.querySelector("button").addEventListener("click", function(){
  fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      response.forEach(data => { //  get the weather for city and make a new row for the value returns
        let table = document.querySelector('table')
        let tr = document.createElement('tr');
        let inputValue = data.city + ",US"  // gets nasa city and adds us country code from openweathermap
        if (data.city === "Marshall Flght Center"){
          inputValue = "Huntsville,AL"
        }else if(data.city === "Langley Research Center"){
          inputValue = "Hampton,VA"
        }else if(data.city === "Johnson Space Center"){
          inputValue = "Houston,Tx"
        }else if(data.city === "Goddard Space Flight Center"){
          inputValue = "Greenbelt,MD"
        }
        // i worked on the above piece of code  w ellie. having a display helped me visualise things better.
        // above is to display cities and weather can be accessed through openweather

        fetch("https://api.openweathermap.org/data/2.5/weather?q="+`${inputValue}`+"&appid=bc535b125f010e0beaf71fc79a1232c9") // gets weather API for the city
          .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
          .then(response => {
            let fahrenheit = (response.main.temp - 273.15) * 9 / 5 + 32 // converts k to farenheit
            let temperature = Math.ceil(fahrenheit) + "&#176;" + "F"
             // math.ceil() to round the temperature up to the nearest whole integer
            tr.innerHTML = `<tr>
                   <td>${data.facility}</td>
                    <td>${data.city}</td>
                    <td>${data.state}</td>
                    <td>${temp}</td>
                    </tr>`
            table.appendChild(tr);
            // table to display to the dom-- appending fac,city +state to the table

          })
          .catch(err => {
            console.log(`error ${err}`)
            alert("sorry, there are no results for your search")
          });
      })
      console.log(response)
    })
    .catch(err => {
      console.log(`error ${err}`)
      alert("sorry, there are no results for your search")
    });


});
