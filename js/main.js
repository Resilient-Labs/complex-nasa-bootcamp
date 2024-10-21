

// document.querySelector('button').addEventListener('click',  getFacility) 

// function getFacility(){

// fetch("https://data.nasa.gov/resource/gvk9-iz74.json")  
// .then(res => res.json())                                      
// .then(data => {                
//     console.log(data)
//     const randomIndex = Math.floor(Math.random() * 485)

//     console.log(data[randomIndex].facility)
//     console.log(data[randomIndex].city)
//     console.log(data[randomIndex].location.longitude)
//     console.log(data[randomIndex].location.latitude)

    
//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[randomIndex].location. latitude}&lon=${data[randomIndex].location.longitude}&appid=62a4ef726e892c3ebd3f60ee52e77367`)
//     .then(res => res.json())
//     .then(weatherData => {
//         console.log(weatherData);
//     // document.querySelector('button').innerText = randomIndex  
// }) 
// .catch(err =>{                      
//     console.log(`error ${err}`) 
//  })
 
// }


// document.querySelector('button').addEventListener('click', getFacility);

// function getFacility() {
//   fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);                                                                                  //  the data in here will be like location,name, facility etc                                                   
//       const randomIndex = Math.floor(Math.random() * data.length); 
//       console.log(data[randomIndex].facility);
//       console.log(data[randomIndex].city);                                                                // 
//       console.log(data[randomIndex].location.longitude);
//       console.log(data[randomIndex].location.latitude);

//       const latitude = data[randomIndex].location.latitude;
//       const longitude = data[randomIndex].location.longitude;

//       fetch(`https://api.weatherapi.com/v1/current.json?key=eb323c3cde744db09bb174533241710&q=${city},${country}`) //this is where you connected both apis, your taking the longitude and latitude from nasa and using the weather api to match it up
//         .then(res => res.json())
//         .then(weatherData => {
//           console.log(weatherData);
//         })
//         .catch(err => {
//           console.log(`error ${err}`);
//         });
//     })
//     .catch(err => {
//       console.log(`error ${err}`);
//     });
// }






    fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
      .then(res => res.json())
      .then(data => {
        console.log(data);                  


        data.forEach((facility) => {
           const latitude = facility.location.latitude;
            const longitude = facility.location.longitude;
            const facilityName = facility.facility
            const cityName = facility.city
            const ul = document.createElement('ul')
            const liName = document.createElement('li')
            const liLocation = document.createElement('li')
            const liTemp = document.createElement('li')


            fetch(`https://api.weatherapi.com/v1/current.json?key=eb323c3cde744db09bb174533241710&q=${latitude},${longitude}`)
            .then(res => res.json())
            .then((weatherData) => {
            console.log(weatherData);
            const tempFacility = weatherData.current.temp_f
            document.querySelector('.facilities').appendChild(ul)
            ul.appendChild(liName)
            ul.appendChild(liLocation)
            ul.appendChild(liTemp)
                liName.innerText = facilityName
                liLocation.innerText = cityName
                liTemp.innerText = tempFacility
            })
            .catch(err => {
            console.log(`error ${err}`);
            });

      

          
            
        })
})


// display facility name to the DOM
// dispaly weather to the DOM

