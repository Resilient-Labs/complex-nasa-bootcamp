let result = document.querySelector("main");

   fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
            data.forEach(item => {
              result.innerHTML += 
              `<div>
              <h2>${item.center}</h2>
              <h2>${item.city}, ${item.state}</h2>
              <h2>${item.zipcode}</h2>
              <h2><button id="btn" data-zipcode="${item.zipcode}">See Current Weather</button></h2>
              </div>`
             
            })

            document.querySelectorAll('#btn').forEach(item=>{   
               item.addEventListener('click', getWeather)
           })



    })

 
  function getWeather(el) {
     let zipcode = el.target.getAttribute('data-zipcode') 
     fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zipcode}?unitGroup=us&key=EL4FSCSSLZU6XJJDPHWFQFV3G&contentType=json`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      el.target.innerHTML = data.description
       
    })
  }




   

