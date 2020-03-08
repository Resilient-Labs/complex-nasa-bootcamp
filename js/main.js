let count = 0
function getLocation(){
fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      // let zipcode = []
      // let center = []
      response.forEach((el)=>{
        // zipcode.push(el.zipcode)
      // document.querySelector('p').textContent=zipcode
      if(count < 10 ){
        getWeather(el.zipcode, el.center, el.facility )
        count++
      }
      // getWeather(el.zipcode)
      console.log(el.zipcode)
    })
    .catch(err => {
        console.log(`error ${err}`)
        alert("sorry, there are no results for your search")
    });
})
}
function getWeather(zipcode, center, facility){
  // let url =
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${zipcode}&APPID=e71acf2c8f36d9b1df7f78ba278857d3`)
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      if(response.main.temp){
        console.log(response.main.temp)
        let fahrenheit = Math.floor((response.main.temp - 273.15) * 1.8 + 32) + "F"
        document.querySelector('.temp').innerHTML+=fahrenheit
        document.querySelector('p').textContent+=zipcode
        document.querySelector('.center').textContent+=center
        document.querySelector('.facility').textContent+=facility
        console.log(fahrenheit);
        console.log(center);
        console.log(facility);
        console.log(zipcode);
      }
      // console.log(response.main);
    })
      // .catch(err => {
      //     console.log(`error ${err}`)
      //     alert("sorry, there are no results for your search")
      // });
}

getLocation()
