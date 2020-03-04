// Complex NASA API


function getLocation(){
fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
.then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      let zipCode = [];
      response.forEach((el)=> {
        zipCode.push(el.zipcode);
        // WE ALSO NEED of zip code we can get the center name from response.center
        document.querySelector('p').innerHTML= zipCode;
      })
    })
    .catch(err => {
        console.log(`error ${err}`)
        alert("sorry, there are no results for your search")
    });
    getWeather()

  }

function getWeather(love){
      inputZip();
      singleZip();

      fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${love},us&appid=9f46d0f653902e57a2d6d49da811c971`)
      .then(res2 => res2.json()) // parse response as JSON (can be res.text() for plain response)
      .then(response2 => {
          console.log(response2.main.temp)
        })
       .catch(err2 => {
           console.log(`error ${err2}`)
           alert("sorry, there are no results for your search")
       });
    }

function inputZip(){
    let zipCodeInput = ["32899", "23681-2199", "32899", "35812", "35812", "32899", "32899", "91109", "91109", "32899", "91109", "39529-6000", "35812", "23337-5099", "35812", "35812", "91109", "91109", "20771", "70189", "20546"];
      let zipCodeTEST2 =[];
          zipCodeInput.forEach((el) => {
            let elNew = parseFloat(el,10)
            zipCodeTEST2.push(elNew);
            console.log(zipCodeTEST2)
      })
    }

function singleZip(){
  inputZip(zipCodeTEST2);
  zipCodeTEST2.forEach((el) =>{
    let love = this;
  })

}




      getLocation();
      // inputZip();

// function inputZip(){
//   let zipCodeInput = ["32899", "23681-2199", "32899", "35812", "35812", "32899", "32899", "91109", "91109", "32899", "91109", "39529-6000", "35812", "23337-5099", "35812", "35812", "91109", "91109", "20771", "70189", "20546"];
//     let zipCodeTEST2 =[];
//     zipCodeInput.forEach((el) =>{
//       let elNew = parseFloat(el,10)
//       zipCodeTEST2.push(elNew);
//       console.log(zipCodeTEST2);
// }
// }
