// completed js with House Gardner
// Asianna, Ziya, Dashlin, Brian, Julie, Tanecia, Wade


document.querySelector("button").addEventListener('click',facilityFinder, {once:true})


function facilityFinder() {
fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
  // document.querySelector('.facility_amount').innerText = data.length
data.forEach(item => {
let long = item.location.longitude
let lati = item.location.latitude

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=imperial&appid=e680cb03b350a5d553108f026a1f23e4`)
        .then(res => res.json())
        .then(data => {
        let facility = item.facility
        let table = document.getElementById('facilityTable')
        let newRow = table.insertRow()
        let newCell = newRow.insertCell()
        let newFacility = document.createTextNode(`${facility}| Temperature: ${data.main.temp}`)
        newCell.appendChild(newFacility)
        // .catch(err => {
        //   console.log(`error ${err}`)
          //alert("sorry, there are no results for your search")
        });
    })
  })
}
