
document.querySelector('form').addEventListener('click', nasa);
fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=f461bb1f67b3c95d2d78b2778279a6f5`)
  .then(res => res.json())
  .then(response =>{
    let kel = response.main.temp
    let cel = kel -273
    let far = Math.round((1.8 * cel)+ 32)

    sentence.innerHTML =`At Nasa's ${facility} in ${city}, ${country}  the weather is ${far}&#8457;`

        list.appendChild(description);
    })
function nasa(el){
 el.preventDefault();
 fetch(`https://data.nasa.gov/api/views/gvk9-iz74/rows.json?api_key=TLdrXDLYnnEO11EydTHHPCrDQqfgWxRHTdcv8J2i`)
 .then(res => res.json())
 .then(response =>{
   console.log(el)
   response.data.forEach(function(info){

     let facility = info[8]
     let city = info[21];
     let country = info[22];
     let lat = info[20][1];
     let lon = info[20][2];

     const list = document.querySelector('ul');
     const description = document.createElement('li');
     .catch(err => console.log('error:' + err))
   })
 })
 .catch(err => console.log('error: ' + err))
}
