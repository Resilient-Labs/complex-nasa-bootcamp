document.querySelector('button').addEventListener('click', getCity)


function getCity(){
  //let selection = document.querySelector('input').value
  let url = `https://data.nasa.gov/resource/gvk9-iz74.json`
   
  fetch(url) 
    
  //converting url in a way to read script
    .then(res => res.json())
    .then(data => { 
      data.forEach(facilityInfo => {
        let facilityZip= facilityInfo.zipcode
        let facilityName = facilityInfo.facility

        let url = `http://api.weatherapi.com/v1/current.json?key=79356b3e7cc44aad865194224230504&q=${facilityZip}`

        fetch(url)
        .then(res => res.json())
        .then(data => {
          let li = document.createElement('li')
          li.innerText = `At ${facilityName} in ${data.location.name}, it is ${data.current.temp_f}`
          let ul = document.querySelector('ul')
          ul.appendChild(li)
    
        }) 


      })
    
      
      //document.querySelector('h2').innerText = `The temp in ${data.location.name} today is ${data.current.temp_f}`
    })
  .catch(err => { 
    console.log(`error ${err}`) 
  }); 

}
