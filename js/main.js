let url = `https://data.nasa.gov/resource/gvk9-iz74.json`
let url2 = ``
fetch(url)
.then(res => res.json())
.then(data => {
  for(i=0; i<data.length; i++){
    fetch(url2)
    .then(res => res.json())
    .then(data2 => {
      let facilityName = data[i].center
      let facilityLocation = data[i].zipcode

      let row = document.createElement('tr')
      let column1 = document.createElement('td')
      let column2 = document.createElement('td')
      let column3 = document.createElement('td')

      document.querySelector("tbody").appendChild(row)
      row.appendChild(column1)
      column1.innerText = facilityName
      row.appendChild(column2)
      column2.innertext = facilityLocation

    })
    .catch(err => {
      console.log(`error ${err}`);
    })
  }

})
.catch(err =>{
  console.log(`error ${err}`)
})




//center is name
//zipcode is location
