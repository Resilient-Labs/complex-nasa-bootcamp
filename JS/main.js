// let userPickZipCode = prompt("Type in the desired zipcode!")

function newItem(site, weather) {
  const ul = document.querySelector('#addInput')
  console.log(site, weather)
  let itemAdd = document.createElement("li")
  const addImg = document.createElement("img")
  addImg.src = weather.data.current_condition[0].weatherIconUrl[0].value
  itemAdd.innerHTML = site.center + ', Facility: ' + site.facility + ',' + '<br>' + site.city + ',' + site.state + ', ' + site.zipcode + '<br>' + weather.data.current_condition[0].temp_F + '°F' + '<br>'// added the site on the nasa location and attached the weather from the array. As well as the max temp of the location
  ul.appendChild(itemAdd)
  itemAdd.appendChild(addImg)
  document.querySelector("#addInput").value = ""
}

fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
  .then(res => res.json()) // parse nasaSites as JSON (can be res.text() for plain nasaSites)
  .then(nasaSites => {
    //  console.log(nasaSites.forEach((center) => { //for each will call
    //  console.log(center.zipcode)
    for (let i = 0; i < nasaSites.length; i++) {
    // for (let i = 0; i < nasaSites.length; i++) {
      console.log(nasaSites[i])
      fetch(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=426a3cf867fe4b93995205328200303&q=${nasaSites[i].zipcode}&num_of_days=7&tp=3&format=json`)
        .then(res => res.json()) // parse nasaSites as JSON (can be res.text() for plain nasaSites)
        .then(weather => {
          newItem(nasaSites[i], weather) //Passing in two different apis. Getting the site location and the weather of the sites
        })
        .catch(err => {
          console.log(`error ${err}`)
          //alert("sorry, there are no results for your search")
        });
    }
  })
  .catch(err => {
    console.log(`error ${err}`)
    // alert("sorry, there are no results for your search")
  });



// fetch(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=426a3cf867fe4b93995205328200303&q=${userPickZipCode}&num_of_days=7&tp=3&format=json`)
//     .then(res => res.json()) // parse nasaSites as JSON (can be res.text() for plain nasaSites)
//     .then(nasaSites => {
//       console.log(nasaSites.data.weather)
//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//         alert("sorry, there are no results for your search")
//     });
