

  document.querySelector('button').addEventListener('click',facilities)
 function facilities(){
    //select user input from the API as specified by the user  
    const url =  `https://data.nasa.gov/resource/gvk9-iz74.json`
    fetch(url) // gets information from nasa API
        
    .then(response => response.json())  // its a promise or wait javascript is only  1 thread 
        .then(data => {
         ul = document.querySelector('ul')  
        for(i= 0; i <= 20; i++){ /// for more facilities change to 400 for all of them 
        
        let zipcode = data[i].zipcode
      
        const faciliti =  data[i].center 
        let combine = `${faciliti}${zipcode}`
        const weather_api = `https://api.weatherapi.com/v1/current.json?key=1f1de959e02f4f1298211615231910&q=${combine}&aqi=no`
        
        fetch(weather_api)
            .then(res => res.json())
            .then(data =>{
                console.log(data.current) 
                let temp = Math.floor(data.current.temp_f)
                li = document.createElement('li')
                 let text = document.createTextNode(` ${combine}:  ${temp}F`)
                 li.appendChild(text)

                ul.appendChild(li)
                //console.log(data[i].center)
            })} 

    })
       .catch(error => {
            console.log(`Error: ${error}`);
    });
       }
      
    //second api for weather 
    
   
        //    fetch(weather_api)
        //     .then(res => res.json())
        //     .then(data =>{  /// temp_F location name
        //         // li = document.createElement('li')
        //         // li.innerText =`${data.country}`
        //         // ul.appendChild(li)
        //         console.log(data)
        //     })
        //     .catch(error =>{
        //         console.log(`error:${error}`)
        //     })



// data.forEach((item) => console.log(`${item.center},${item.city},${item.state},${item.country}`));

//  fetch(API_URL_DIARY)
// .then(response => response.json())
// .then(data => {
//   console.log("old", data);
//   return data;
// })
// .then(data => {
//   data.forEach(function(e, index,array) {
//     fetch(API_URL_FOOD_DETAILS + e.foodid)
//     .then(response => response.json())
//     .then(data => {
//       array[index] = {...e, ...data};
//       console.log("update");
//     })
//     .then(()=>{
//       console.log("new", data)  
//     })
//   });
// });