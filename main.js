//we need facility name
//its location
//the current weather at that location
//facility loaction API
window.addEventListener('load',() => {
  let api = "https://data.nasa.gov/resource/gvk9-iz74.json"
  fetch(api)
  .then(res => res.json())
  .then(response => {
    // console.log(response)
    printFacilities(response)

   });
  // .catch(err => {
  //   console.log(`error ${err}`)
  //   alert("sorry, there are no results for your search")
  // })
});

let text = 0;

function printFacilities(response){
  console.log(response)
  // let ul = document.querySelector('ul')
  let ul = document.querySelector('#one')
  // let two = document.querySelector('#two')
  // let three = document.querySelector('#three')
  // let four = document.querySelector('#four')
  for(i=0; i<10;i++){
  // for(i = 0; i < response.length; i++){
  let li = document.createElement("li")
  let span = document.createElement('span')
  //latitude
  let latresp = parseFloat(response[i].location.latitude);
  let longresp = parseFloat(response[i].location.longitude)
  let lat = latresp.toFixed(4)
  let long = longresp.toFixed(4)
console.log(typeof latresp.toFixed(4), typeof longresp)

  //
  // getWeather(lat,long)


  // console.log(temp)
  // console.log(temp);

  // console.log(lat)
  // console.log(long)
console.log(getWeather(lat,long))
// console.log(lat)
  //facility name
  li.appendChild(document.createTextNode((response[i].facility)))
  ul.appendChild(li)
  //city name
  li.appendChild(document.createTextNode((" " + response[i].city)))
  ul.appendChild(li)
  //state name
  li.appendChild(document.createTextNode(( " " + response[i].state)))
  ul.appendChild(li)


  // li.appendChild(document.
    // document.createElement('li').appendChild(document.createElement('span'))
  li.appendChild(span)
  ul.appendChild(li).appendChild(span)


}

}


function getWeather(par1,par2){  //async vs sync code - synchronous - do something when that something is done, do the next thing (Dominoes analogy). - Asynchronous Code - While you are doing that, I am going to do this, and then
    //I am going to take whatever I got from you, and then once your done, I will take.
    //A promise - the promise, I dont have that thing you are looking for, but I promise I will get it to you. The get whether function hasn't finish, we are only getting the promise. If we dont have asynchronus set-up
    //We only return the promise.
    //Its a good idea to add this as a best practice, make all your functions asynchronus if it.
    //Asynchronus and await.
  // var proxy = 'https://cors-anywhere.herokuapp.com/'
  // var api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=68be3e48ac168d3674e8c5afa21b1366`

  var proxy = 'https://cors-anywhere.herokuapp.com/'
  var api = `${proxy}https://api.darksky.net/forecast/9673be2d203ffb893fe4d3e11fd6d0b9/${par1},${par2}`
  // console.log(api)
  // Boston Lat, Long: 42.3601,-71.0589;
  // console.log("this is my url",api)
fetch(api)
  .then(res => res.json())
  .then(data => {
    // console.log(data.currently.temperature.toString());
      var text = Math.ceil(data.currently.temperature).toString()
      // document.querySelector('span').innerHTML = text
      let ul = document.querySelector('#two')
      let li = document.createElement('li')
      li.appendChild(document.createTextNode(( ", " + text)))
      ul.appendChild(li)

      // return temp
  })
}


//
// //Weather API
// function getWeather(par1,par2){
// // var proxy = 'https://cors-anywhere.herokuapp.com/'
// // var api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=68be3e48ac168d3674e8c5afa21b1366`
// var proxy = 'https://cors-anywhere.herokuapp.com/'
// var api = `${proxy}https://api.darksky.net/forecast/9673be2d203ffb893fe4d3e11fd6d0b9/${par1},${par2}`
// // console.log(api)
// // Boston Lat, Long: 42.3601,-71.0589;
// // console.log("this is my url",api)
//  fetch(api)
// .then(res => res.json())
// .then(data => {
//   console.log(data.currently.temperature.toString());
//     var text = data.currently.temperature.toString()
//     return text
//     // let ul = document.querySelector('ul')
//     // let li = document.createElement("li")
//     // li.appendChild(document.createTextNode(( ", " + text)))
//     // ul.appendChild(li)
//
//     // return temp
// })
// }
