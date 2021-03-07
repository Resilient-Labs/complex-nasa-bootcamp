document.querySelector('button').addEventListener('click',()=>{
  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(res=>res.json())
    .then(response =>{
    // console.log(data);
    response.forEach((obj)=>{
      let city=obj.city
      let facility=obj.center
      let country=obj.country
      let latitude=obj.location.latitude
      let longitude=obj.location.longitude
      const ol = document.querySelector('ol')
      const li = document.createElement('li')
      // putting variables long and lat into the  other api to get the weather in that area
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=cde24e059a37078b19c4915852a03133`)
        .then(res=>res.json())
        .then(data =>{
          console.log(data)
          let mainTemp=data.main.temp
          let location = data.name
          let weather=data.weather[0].main
          // plugging in the info from both apis to the dom
          li.innerHTML = li.innerHTML + facility + " is in " + city + " with a current temp of " + mainTemp
          ol.appendChild(li);
        })
        .catch(err=>{
          console.log(`error ${err}`)
        })
     })
  })
  .catch(err => console.log('error' + err));
})
