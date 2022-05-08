//Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.
let url = "https://data.nasa.gov/resource/gvk9-iz74.json"
 fetch(url)
 //res= result ---> parse it into JSON syntax (parse response as JSON)
 .then(res => res.json())
 // data ---> pass the data retrieved into the function 
 .then(data => {
  // console.log(data[i].center)
  // console.log(data)
   
  //loop over array length to print all the facilities names & locations  
  for(let i=0; i<data.length; i++){
    let ul = document.querySelector('.list')
    let li = document.createElement("li");
    ul.appendChild(li);
    li.innerText = data[i].center;
    // console.log(data)
    let ul2 = document.querySelector('.location')
    let li2 = document.createElement("li");
    ul2.appendChild(li2);
    // document.querySelector('.location').innerText=
    li2.innerText = data[i].city;
    console.log(data)
    console.log(data[i].city);
    let location= data[i].city;
    // let url2 = `http://api.weatherapi.com/v1/forecast.json?key=73ad2a5104a64ba59a6161613220305&q=${location}&days=1&aqi=no&alerts=no`
    // //  document.querySelector('.location').innerText=data.location[0].center
    //  document.querySelector('.facility').innerText =data.name
    let url2 = `http://api.weatherapi.com/v1/forecast.json?key=73ad2a5104a64ba59a6161613220305&q=${location}&days=1&aqi=no&alerts=no`
  
    // let location= data[i].centers

    // let url2 = `http://api.weatherapi.com/v1/forecast.json?key=73ad2a5104a64ba59a6161613220305&q=${location}&days=1&aqi=no&alerts=no`
    
    fetch(url2)
    .then(res => res.json())
    .then(data => {
      // console.log()
      // console.log(location)
      //loop over weather API object to print all corresponding city's forecasts 
      //*insert li's into ul's-see previous example*
      // for(let i=0; i< data.length; i++){
        let ul3 = document.querySelector('.weather-list')
        let li3 = document.createElement("li");
        let outlook = document.querySelector('.outlook')
        let li4 = document.createElement("li");
        ul3.appendChild(li3);
        outlook.appendChild(li4)
        li3.innerText = data.current.temp_f + '°F'
        li4.innerText= data.current.condition.text
        console.log(data.current.temp_f)
        console.log(data.current.condition.text)
      // }   

    })
  }

    })
    .catch(err =>{
     console.log(`error ${err}`)
   })
 



