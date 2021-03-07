/* 2 api pseudocode
API NASA: https://data.nasa.gov/resource/gvk9-iz74.json
need api for weather of the nasa location
https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country},&units=imperial&appid=b4a8249fdb18e85af658ae914f292e78
user will input state
*/
//Mark helped//
//House Moses!!!!//
const url1 = 'https://data.nasa.gov/resource/gvk9-iz74.json'
fetch(url1)
  .then (res=> res.json())
  .then (data=>{
    console.log(data)

    for (i = 0 ; i < 3; i ++){
      const location = data[i].zipcode.substring(0,5)
      const url2= `https://api.openweathermap.org/data/2.5/weather?zip=${location},US&units=imperial&appid=203664390ed3e99924aa214f81e452a6`


      fetch(url2)
        .then (res => res.json())
        .then (data2 =>{
          console.log(data2)
        
      var facility = data[i].center
      var address = data[i].location.human_address
      var weather = data2.main.temp
      var weatherFeel = data2.main.feels_like
      const section = document.createElement('section')

      let centerView = document.createElement('h2')
      centerView.innerText = facility
      section.appendChild(centerView)

      let addressView = document.createElement('h3')
      addressView.innerText = address
      section.appendChild(addressView)

      let weatherView = document.createElement('h4')
      weatherView.innerText = weather
      section.appendChild(weatherView)

      let weatherFeelView = document.createElement('h5')
      weatherFeelView.innerText = facility
      section.appendChild(weatherFeelView)




    })
  }
  })
  // .catch(err =>{
  // //   alert(`error ${err}`)
  // })
