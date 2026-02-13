///////// INTRO TO MY ISSUE: I've made this object in the doxxNasa function, but I'm having trouble calling the weather list after I pass it to the next function. I've put a console.log so you can see the object after its made.

const apiKey = 'ae194c9fd4f9c372a84ee9d9568b0d6f'

document.querySelector('button').addEventListener('click',doxxNasa)

//making the object
function doxxNasa() {
    let centers = {}
    fetch('https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json')
        .then(res => res.json())
        .then(data => {
            //  organize the data received into an object, minimizing the amount of calls later on
            
        
            data.forEach(point => {
                ////consolidate the facilities into their respective centers
                //  initialize new key value pair if the center is not in object
                if (!Object.keys(centers).includes(point.center)){

                    //  add the location and facilities list upon initialization(courtesy of Michael Kazin)
                    centers[point.center] = {facilities : [],location:point.location}
                    centers[point.center].facilities.push(point.facility)
                    

                } else {

                    //  add facility to the list of facilities in the specific location
                    centers[point.center].facilities.push(point.facility)

                } 
            })
            findWeather(centers)
            
             
            // makeTable(centers)
        })
        .catch(err=>console.log(err))
        
}

function findWeather(centers) {
    //Had to cave in to chatGPT to learn about promises, I needed that information to properly form the object without running into undefined errors
    // Create an array of promises
    const weatherPromises = Object.values(centers).map(value => {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${value.location.latitude}&lon=${value.location.longitude}&units=imperial&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                value.location.city = data.name;
                value.location.temp = data.main.temp;
                value.location.weather = data.weather[0].description;
            })
            .catch(err => console.log(err));
    });

    // Wait for all weather fetches to complete
    Promise.all(weatherPromises)
        .then(() => {
            makeTable(centers);
        });
}


function makeTable(centers) {
    console.log(centers['Kennedy Space Center'].location.city) 
    // console.log('Centers',centers)
//// THIS IS WHERE MY TROUBLE STARTS    /////////
//I'm trying to call the weather object's list, but I keep getting undefined
    if (document.getElementById('table')) {
        let deleteTable = document.getElementById('table')
        deleteTable.parentNode.removeChild(deleteTable)
    }

    let table = document.createElement('table')
    table.id = 'table'

    
    for (const[key,value] of Object.entries(centers)) {
        // console.log([key,value])
        value.facilities.forEach(facility => {
            // console.log(facility)
            let row = table.insertRow()

            for (let i = 0; i<5 ; i++) {
                const newCell = row.insertCell()
                if (i==0){
                    newCell.textContent = facility
                } else if(i===1) {
                    newCell.textContent = key
                } else if (i ===2) {
                    newCell.textContent = value.location.city
                } else if (i === 3) {
                    newCell.textContent = value.location.weather
                } else if (i === 4) {
                    newCell.textContent = value.location.temp
                }
            }
                
            
        }
        )
    
    }
    document.body.appendChild(table);
}

// centers['test1']= 'boo'
                    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${centers[point.center].location.latitude}&lon=${centers[point.center].location.longitude}&units=imperial&appid=${apiKey}`)
                    //     .then (res => res.json())
                    //     .then(data => {
                    //     //  place location, temperature, and weather in the same center object
                    //     centers['test2']='oob'
                    //     centers[point.center].weather = {'city location' : data.name, 'temp' :data.main.temp , 'weather' : data.weather[0].description}
                    // })
                    // .catch(err => console.log(err))

// const nasaUrl = `https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`

// const facilities = document.querySelector('#facilities')
// const loc = document.querySelector('#location')

// // i did have trouble using async syntax and for loops, so i applied hector's strategy of using the basic fetch syntax

// fetch(nasaUrl)
//     .then(res =&gt; res.json()) // parse response as JSON
//     .then(nasaData =&gt; {
//         nasaData.forEach((x, i) =&gt; {
//             const lat = nasaData[i].location.latitude
//             const lon = nasaData[i].location.longitude
//             const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&amp;lon=${lon}&amp;APPID=0e904a2a7aacc8772e00052c29bf80c8`;
//             fetch(weatherUrl)
//                 .then(res =&gt; res.json()) // parse response as JSON
//                 .then(weatherData =&gt; {

//                     facilities.innerHTML += ` ${nasaData[i].facility} || ${lat} ${lon} || Temp: ${(((weatherData.main.temp - 273.15) * 1.8) + 32).toFixed(1)} F | Humidity: ${weatherData.main.humidity} | Sky: ${weatherData.weather[0].description}`

//                 })
//                 .catch(err =&gt; {
//                     console.log(`error ${err}`)
//                 });
//         })
//     })
//     .catch(err =&gt; {
//         console.log(`error ${err}`)
//     });