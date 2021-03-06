// EVENT LISTENER
document.querySelector('button').addEventListener('click', findFacility)

// MAIN FUNCTION
function findFacility(){
  //FIRST API - NASA
  let userInput = document.querySelector('.input').value
  fetch(`./js/nasainfo.json`)
  .then(res => res.json())
  .then(data=>{
    //filter each item data for zipcode and match with user input - return item
    let filterFacility = data.filter(item => {
      // console.log(item)
      if(item.zipcode === userInput){
        return item
      }
    })
    
    //for each item get specific data
    filterFacility.forEach(item =>{
      document.querySelector('.facility_amount').innerText = item.facility.length
      document.querySelector('.place_name').innerText = item.center
      document.querySelector('.location').innerText = `${item.state}, ${item.country} ${item.zipcode}`
      // console.log(item)
      //variables for adding table row for each item
      let facility = item.facility
      let table = document.getElementById('myTable')
      let newRow = table.insertRow()
      let newCell = newRow.insertCell()
      let newFacility = document.createTextNode(facility)
      newCell.appendChild(newFacility)
    })
  })
  //SECOND API - WEATHER
  fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${userInput}&appid=b63e2f9db34e2b9c2332cb18f8b3509c&units=imperial`)
  .then(res => res.json())
  .then(data => {
    document.querySelector('.weather').innerText = `${data.main.temp} °F`
  })  
   .catch(err => {
    console.log(`${err} Error - temp not found`)
  })
}
