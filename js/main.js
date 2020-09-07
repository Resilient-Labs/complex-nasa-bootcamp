let Nasa = {
  buttons: [...document.querySelectorAll('.weather')],
  buttons2: [...document.querySelectorAll('.forecast')],
  center: [],
  facility: [],
  currentButton: '',
  table: '<caption>Nasa Facilities</caption><colgroup><col><col span="1" class="facilities"><col span="1" class="center"><col span="1" class="facilities"><col span="1" class="center"></colgroup><tr><th scope="col">#</th><th scope="col">Facility</th><th scope="col">Center</th><th scope="col">Get Weather</th><th scope="col">Get Forecast</th></tr>',
  getData: ()=>{
    fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
      .then(response => response.json())
      .then(data => {
        data.forEach(x=>{

          Nasa.center.push(x.center)
          Nasa.facility.push(x.facility)
        })
      })
      .catch(err => console.log(err))
  },
  makeTable: ()=>{
    Nasa.center.forEach((x,i)=>{
      Nasa.table+=`<tr><th scope="row">${i+1}</th><td>${Nasa.facility[i]}</td><td>${Nasa.center[i]}</td><td><button id="${i}" class='weather'>Get Weather</button></td><td><button name="${i}" class='forecast'>Get Forecast</button></td></tr>`
    })
    document.querySelector('table').innerHTML = Nasa.table
    Nasa.buttons = [...document.querySelectorAll('.weather')]
    Nasa.buttons2 = [...document.querySelectorAll('.forecast')]
    console.log(Nasa)
  },
    getWeather2: (location)=>{

      fetch(`https://api.weatherbit.io/v2.0/current?key=9d35502d567446718837bc0795d7901d&lat=${location[1]}&lon=${location[0]}`)
        .then(response => response.json())
        .then(data => {
          Nasa.buttons[Nasa.currentButton].outerHTML = data.data[0].weather.description
          console.log(data)
        })
        .catch(err => console.log(err))
    },
      getWeather: (location)=>{

        fetch(`https://api.weather.gov/points/${location[1]},${location[0]}`)
          .then(response => response.json())
          .then(data => {
            Nasa.getweather3(data.properties.forecast)
            console.log(data)
          })
          .catch(err => console.log(err))
      },
      getweather3: (a)=>{
        fetch(`${a}`)
          .then(response => response.json())
          .then(data => {
              Nasa.buttons2[Nasa.currentButton].outerHTML = data.properties.periods[0].detailedForecast
          })
          .catch(err => console.log(err))
      },
      getLocation: (e)=>{
        Nasa.currentButton=e.target.id
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${Nasa.center[e.target.id].replace(/' '/g,'%20')}.json?access_token=pk.eyJ1IjoieHNoYXduY3giLCJhIjoiY2tlams1YTNnMDZ3MDJycXNsNGlxbzJlYyJ9.yhpBv07FJ2TZfJW62fs7sA`)
          .then(response => response.json())
          .then(data => {
            Nasa.currentCenterGPS = data.features[0].center.map(x=>x.toFixed(2))
            Nasa.getWeather2(Nasa.currentCenterGPS)
          })
          .catch(err => console.log(err))
      },
      getLocation2: (e)=>{
        Nasa.currentButton=e.target.name
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${Nasa.center[e.target.name].replace(/' '/g,'%20')}.json?access_token=pk.eyJ1IjoieHNoYXduY3giLCJhIjoiY2tlams1YTNnMDZ3MDJycXNsNGlxbzJlYyJ9.yhpBv07FJ2TZfJW62fs7sA`)
          .then(response => response.json())
          .then(data => {
            Nasa.currentCenterGPS = data.features[0].center.map(x=>x.toFixed(2))
            Nasa.getWeather(Nasa.currentCenterGPS)
          })
          .catch(err => console.log(err))
      },

}
Nasa.getData();
setTimeout(()=>{
  Nasa.makeTable()
  Nasa.buttons.forEach(x=>x.addEventListener('click',e=>Nasa.getLocation(e)))
  Nasa.buttons2.forEach(x=>x.addEventListener('click',e=>Nasa.getLocation2(e)))
},1500)
