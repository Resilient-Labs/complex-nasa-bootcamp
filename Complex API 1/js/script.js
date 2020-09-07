// console.log("Everything is good");
// let nasaInfo = [];
// let weatherInfo = [];
//
// fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
//     .then(response => response.json())
//     .then(data => {
//         data.forEach(i => {
//             nasaInfo.push({
//                 "name": i.center,
//                 "country": i.country,
//                 "long": i.location.longitude,
//                 "lat": i.location.latitude
//                 })
//         })
//
//         // for(let i = 0; i < 10; i++){
            // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${nasaInfo[0].lat}&lon=${nasaInfo[0].long}&appid=d90ff8cf2b9f828e5633fd9ca45f0634&units=imperial`)
            //   .then(response => response.json())
            //   .then(weatherData =>{
            //       weatherInfo.push({
            //         "temp": weatherData.main.temp
            //       })
            //       console.log(weatherData)
            //     })
            //   // })

//             console.log(`Name: ${nasaInfo[0].name}`);
//             console.log(`Temp: ${weatherInfo[0].temp} F`);
//             document.querySelector("ul").appendChild(document.createElement("li"));
//             // document.getElementsByClassName("li")[0].innerHTML = `Name: ${nasaInfo[0].name}`;
//             // };
//           })


let weatherArr = [];
let itemNumber = 0;
const complexAPI ={
  ul: document.getElementById("facilities"),
  li: document.createElement("li"),
  button: document.getElementById("button"),
  getWeather(){
    fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
        .then(response => response.json())
        .then(data => {
                for(var x = 0; x<=9; x++){
                  let center = data[itemNumber].center;
                  let lon = data[itemNumber].location.longitude;
                  let lat = data[itemNumber].location.latitude;
                  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d90ff8cf2b9f828e5633fd9ca45f0634&units=imperial`)//Replace API with own key
                    .then(response => response.json())
                    .then(weatherData =>{
                      let temp = weatherData.main.temp
                      weatherArr.push(temp)
                      // let weatherArr = Array.from(weatherData);
                      // console.log(weatherArr)
                      // console.log(weatherArr);
                  })
                    msWait=2000;
                    setTimeout(function() {
                        let temperature = weatherArr[itemNumber];
                        let newLi = document.createElement('li')
                        let info = document.createTextNode(`Name: ${center}, Weather:${temperature}`)
                        newLi.appendChild(info)
                        document.getElementById('facilities').appendChild(newLi)
                          }, msWait)
                        itemNumber++
                        console.log(center, weatherArr[1])
                      }

        })
  }
}

complexAPI.button.addEventListener("click", complexAPI.getWeather);


// function getWeather(facility, name, country, lat, long, count){
//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d90ff8cf2b9f828e5633fd9ca45f0634&units=imperial`)
//         .then(response => response.json())
//         .then(weatherData =>{
//             console.log(count)
//             let newLi = document.createElement('li')
//             let info = document.createTextNode(`The tempurature at ${facility}, ${name}, ${country} is ${weatherData.main.temp} F, COUNT: ${count}`)
//             newLi.appendChild(info)
//             document.getElementById('facilities').appendChild(newLi)
//             console.log(`The tempurature at ${facility}, ${name}, ${country} is ${weatherData.main.temp} F`)
//         })
// };
//
// fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
//     .then(response => response.json())
//     .then(data => {
//         console.log(data.length)
//         data.forEach((nasaLocation, i) => {
//             getWeather(nasaLocation.facility, nasaLocation.center, nasaLocation.country, nasaLocation.location.latitude, nasaLocation.location.longitude, i);
//         })
//     })
