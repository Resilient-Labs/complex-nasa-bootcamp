// We want to make a complex api that will give us the location of all the NASA facilities and display the weather for them as well.

// Mark helped me with this

const url = 'https://data.nasa.gov/resource/gvk9-iz74.json'

fetch(url)
.then(res => res.json())
.then(data =>{
    // when the code works add data.length
    for(let i = 0; i < data.length ; i++){
      let latitude = data[i].location.latitude
      let longitude = data[i].location.longitude

      let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9714db9b8cbac55b94713b0f75e80ad4&units=imperial`
      fetch(weatherUrl)
      .then(res => res.json())
      .then(weatherData =>{
        console.log(weatherData)
        //this creates the li's
        const facility = document.createElement("li");
        //this puts the text from the array into the textnode
        const textNode = document.createTextNode('Facility Name:'+data[i].center+' - Temp: '+weatherData.main.temp);
       facility.appendChild(textNode);
        //this is adding the facilities into the ul
       document.querySelector("ul").appendChild(facility)
       console.log(data[i].center)

      })
    }
})



