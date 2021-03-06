// EVENT LISTENER
document.querySelector('button').addEventListener('click', findFacility, {once: true})

// MAIN FUNCTION
function findFacility(){
  //FIRST API - NASA
  fetch(`./js/nasainfo.json`)
  .then(res => res.json())
  .then(data=>{
    //filter each item data for zipcode and match with user input - return item
    // console.log(data)
    document.querySelector('.facility_amount').innerText = data.length
    data.forEach(item => {
      let long = item.location.longitude
      let lati = item.location.latitude
      
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=b63e2f9db34e2b9c2332cb18f8b3509c&units=imperial`)
      .then(res => res.json())
      .then(data => {
        let facility = item.facility
        let table = document.getElementById('myTable')
        let newRow = table.insertRow()
        let newCell = newRow.insertCell()
        let newFacility = document.createTextNode(`${facility} | Temperature: ${data.main.temp} °F`)
        newCell.appendChild(newFacility)
      })  
    })
  })
}

