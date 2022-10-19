// COMPLEX NASA PROJECT TELLING LOCATION, NAME, AND WEATHER

// steps

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m



//consolelog (data)

// create documentQuery with click event that gets the temp
document.querySelector('button').addEventListener('click', getFetch)


// define the gettemp function

function getFetch() {

    // declare json deruler URL: https://data.nasa.gov/resource/gvk9-iz74.json

    //url must have backticks
    let url = `https://data.nasa.gov/resource/gvk9-iz74.json`


    // define variable for facility, assign it to the h2 element by using query selector
    const facility = document.querySelector('ul');

    fetch(url)
        .then(res => res.json())  // parse response as JSON
        .then(async (data) => {
            //create for loop
           
            for (i = 0; i < data.length; i++) {
                let lat = data[i].location.latitude
              
                let long = data[i].location.longitude
// console.log(data)
               const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`)
               const weather = await response.json()
               console.log(weather)
                    // .then(resp => resp.json()) // parse response as JSON
                    // .then(weather => {
                        // console.log(weather)
                        let li = document.createElement('li');
                        li.innerText = `Center: ${data[i]?.center} | Location: ${data[i]?.city} ${data[i]?.state} | Weather: ${weather.current_weather.temperature}`
                        facility.appendChild(li);
                     
                    // }).catch(e => { console.log(e) })



                // console.log(data)


            }


        })
        .catch(e => { console.log(e) })
}

