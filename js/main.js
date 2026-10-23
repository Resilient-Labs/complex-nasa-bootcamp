document.querySelector('button').addEventListener('click', getLocations)


function getLocations(){

//  const  url = 'https://data.nasa.gov/docs/legacy/gvk9-iz74.json'

const url = 'facilities.json'

 document.querySelector('#list').innerHTML = ''
 
 fetch(url)


 .then(res =>res.json())
 .then(data =>{
    console.log(data)
    let city =  data.city
    
    data.forEach(function(facility){
    let zip = facility.zipcode
    console.log(zip)
    let zip_5 = null; 
    if(zip){
        zip_5 = String(zip).slice(0,5)
    }

    if (!zip) return

    // document.querySelector('#list').innerHTML += data.center + "<br>" + data.state + '-' + data.city

    let url_2 = `https://api.weatherapi.com/v1/current.json?key=6799d49b22804fe3a6d180434262209&q=${zip_5}`

fetch(url_2)

.then(res =>res.json())
.then (weather =>{

 document.querySelector('#list').innerHTML +=  facility.facility + "<br>" + facility.city + ',' + facility.state + "<br>" + weather.current.temp_f + 'F' + '<br><br>'

    })

 })


})


}
