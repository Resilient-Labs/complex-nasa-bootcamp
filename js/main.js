// Use NASA's API to return all of their facility 
// locations (~400). Display the name of the facility,
//  its location, and the weather at the facility currently.
window.onload = function(){
let apiKey = `https://data.nasa.gov/resource/gvk9-iz74.json`
  function facilityInfo(){

      fetch(apiKey)
      .then(function(response) {
          return response.json();
        })

      .then(function (response){ 
          console.log(response) 
          // let obj = JSON.parse(response)
          let obj = response.forEach(function(element){
              console.log(element)

              let  keys = Object.keys(element)
              let  value = Object.values(element)
              // console.log(Object.keys(element))
              // console.log(Object.values(element))

              parsing(keys, value, element)
              keys.toString();
              value.toString();
              document.querySelector('#first').textContent = keys
              document.querySelector('#second').textContent = value
              document.querySelector('span').textContent = value.city
          })
          // console.log(obj)
          // parsing(eachList.country)
      })
          // console.log(data[0].country)
          // document.querySelector("section").innerHTML = response.city
      .catch(err => console.log(err))

      
      }
      //Function will be displaying each location for each NASA facility
      function parsing(keys, value, element){
          // document.querySelector('p').textContent = country
          for(let i = 0; i < element.length; i++){
              document.querySelector('#first').textContent = keys[i]
              console.log("this is i: ", i)
              document.querySelector('#second').textContent = value[i]

          }

      }
      facilityInfo()
     
}