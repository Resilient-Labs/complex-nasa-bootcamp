document.querySelector('button').addEventListener('click', getFetch)
let ul = document.querySelector('ul')

function getFetch(){
      ul.innerHTML = '' //
      const url = 'https://data.nasa.gov/resource/gvk9-iz74.json'

      fetch(url)
            .then(res => res.json()) // parse response as json
            .then(data => {
                  
                  for(let i=0; i< data.length; i++){  // start from 0  , end at index less than the array, continuously go up by 1
                        let zipcode = data[i].zipcode
                        let facilityName = data[i].facility
                        console.log(zipcode,facilityName)
                 
                        let url2 = `http://api.weatherapi.com/v1/current.json?key=5ea1d299f5c9498999d80710230804&q=${zipcode}`
                        fetch(url2)
                        .then(res => res.json()) // parse response as json
                        .then(data => {
                              let tempature = data.current.temp_f
                              let city = data.location.name
                              let state = data.location.region
                               
                              let li = document.createElement('li')
                                    li.innerText = `Here at facility ${facilityName}, the current temperature is ${tempature} °F located at ${city} in ${state}.`     // option + shift + 8 = degree °

                               ul.appendChild(li)
            
                              console.log(data)
                        })
                  .catch(err => {
                        console.log(`error ${err}`)
                  });
                  }     

                        
            })
      .catch(err => {
            console.log(`error ${err}`)
      });


}