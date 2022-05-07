document.querySelector('button').addEventListener('click', nasaInfo)

const apiKey = '886253015f3a5914e02ad47976fa18d1'
const ul = document.querySelector('#dataList')

function nasaInfo() {  
fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(res => res.json()) 
    .then(data => {

      for (let i = 0; i < data.length; i++ ){
        let lat = data[i].location.latitude;
        let lon = data[i].location.longitude;
        // console.log(lat)
        // console.log(lon)

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(res => res.json()) 
    .then(dataTwo => {

      // console.log(dataTwo)

      let nasaFacilityinfo = `${i} ${data[i].facility} ${lat} ${lon} ${dataTwo.main.temp}`

      // console.log(nasaFacilityinfo)

      let liCreate = document.createElement('li')  
      
      liCreate.innerText = nasaFacilityinfo

      ul.appendChild(liCreate)        

    })
    .catch(err => {
        console.log(`error ${err}`)
    })
      
  }

      






    })
    .catch(err => {
      console.log(`errors ${err}`)
    })


} 
// end of function

// Dennis helped with this project 









      // document.querySelector('h3').innerText = data.explanation

      // if( data.media_type === 'image'){
      //       document.querySelector('#nasaImg').src = data.hdurl
      // }else if( data.media_type === 'video'){ 
      //       document.querySelector('iframe').src = data.url
      // }else{
      //       alert('Unsupported Media Type')
      // }

      // document.querySelector('h3').innerText = data.
