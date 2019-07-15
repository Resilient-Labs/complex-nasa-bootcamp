
//we need facility name
//its location
//the current weather at that location
//facility loaction API

window.addEventListener('load',() => {
  let api = "https://data.nasa.gov/resource/gvk9-iz74.json"
  fetch(api)
  .then(res => res.json())
  .then(response => {
    console.log(response)
    printFacilities(response)
    getLocation(response)
   });
  // .catch(err => {
  //   console.log(`error ${err}`)
  //   alert("sorry, there are no results for your search")
  // })
});


function printFacilities(response){
  let ul = document.querySelector('#facilities')
  for(i = 0; i < response.length; i++){
  let li = document.createElement("li")
  li.appendChild(document.createTextNode((response[i].facility)))
  ul.appendChild(li)
   }
}

function getLocation(response) {
  for (i = 0; i < response.length; i++){
    let span = document.createElement('span')

    response[i].location.latitude
  }
}






//Weather API
// var proxy = 'https://cors-anywhere.herokuapp.com/'
// var api = `${proxy}https://api.darksky.net/forecast/9673be2d203ffb893fe4d3e11fd6d0b9/42.3601,-71.0589`;
//  fetch(api)
// .then(response =>{
//   return response.json();
// })
// .then(data => {
//
//     var text = document.createTextNode(data.currently.temperature)
//     var description = document.createTextNode(data.currently.summary)
//     insertTemp.appendChild(text)
//     insertSummary.appendChild(description)
// });
