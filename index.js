// //weather API KEY c584f778965044afa14222305232010 

// // URL
// // http://api.weatherapi.com/v1/{key}

// // Nasa
// // https://data.nasa.gov/resource/gvk9-iz74.json

// //Center, 

// // Location Object's 
// //location, lat, lon, for location


// document.querySelector("button").addEventListener("click", mood);

// function mood() {

//                      //Mode retrieval type, Today, Author, Random
//                      //key can be removed
//                      //options can also be removed


//     // let url = "https://programming-quotesapi.vercel.app/api/random"

//     //api#1
//     fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
//     .then(response => response.json())
//     .then(data =>  {

//         //display name of facility, its location & the weather at the facility currently
    

//         //going throught the length of the data which is = to the array of the locations 465+~
//     for (let i = 0; i < data.length; i++) {

//      //make a loop that goes through all 400 ish location's 

//     //can declare these value's

//      //Choose a value to display for location
    
//     let center = data[i].center
    
//     let longtitudeInfo = data[i].location.longitude //Direct target for longtitude //pass through the weather api thru temp literal
//     let latitudeInfo = data[i].location.latitude  //Direct target for latitude  //pass through the weather api thru temp literal
//     let zipCodeInfo = data[i].zipcode //Direct target for zipcode
//     let stateInfo = data[i].state //Direct target for
//     console.log(data[i])
//     // console.table(data[i]) to visualize a table
   

//     //  console.log(data)

//                 //&tag={Key word selected from first api}

//     // https://api.giphy.com/v1/stickers/random?api_key=zxQfl97UZQrhC6c8RKyXXo8nVJ5Y6njg&tag=run&rating=pg-13


//     let secondApiUrl = `http://api.weatherapi.com/v1/current.json?key=c584f778965044afa14222305232010&q=${zipCodeInfo}`
//     // `http://api.weatherapi.com/v1/current.json?key=c584f778965044afa14222305232010&q=
//     //api#2
//             // ? should be after the full link (url link, When you are gonna add multiple add amperson )
//         fetch(secondApiUrl)
//         .then(res => res.json())
//         .then((weatherData) => {
//             document.querySelector('.list').innerHTML = zipCodeInfo
//             console.log(data[i].zipcode)
//             console.log(weatherData);          //Good habit to name second set of data
//     })

      
//     }
//     })
//     .catch((error) => {
//       console.error("Error: ", error);
//     });
// }
// //Where are we at currently, we have the location & the weather of that location


// // Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
// // city name e.g.: q=Paris
// // US zip e.g.: q=10001
// // // UK postcode e.g: q=SW1





