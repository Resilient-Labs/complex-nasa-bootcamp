
function nasa(e){
  e.preventDefault();
  //get api for nasa facilities
  fetch(`https://data.nasa.gov/api/views/gvk9-iz74/rows.json?api_key=cas0ypna9osesCIo8tdXzH9FNEYTFyukdGrUU3z9`)
  .then(res => res.json())
  .then(response =>{
    //for each data display center name and city,state
    response.data.forEach(function(info){
      //variable to contain ul from DOM
      const list = document.querySelector('ul');
      //variable to create li to append into ul
      const sentence = document.createElement('li');
      //create variables for all the information taken from the facility api
      let center = info[8]
      let city = info[21];
      let country = info[22];
      //variables for latitude and longitude to use in weather api
      let lat = info[20][1];
      let lon = info[20][2];
      //get weather api, pass thru lat and lon as parameters
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=2b44e18fff6f1ce8beae7afaf9e81c36`)
        .then(res => res.json())
        .then(response =>{
          //convert temp to farenheit
          let kel = response.main.temp
          let cel = kel -273
          let far = Math.round((1.8 * cel)+ 32)
          //display everything into the DOM
          sentence.innerHTML =`At ${center} in ${city}, ${country} the weather is ${far}&#8457;`
          //append all the sentences into the DOM
          list.appendChild(sentence);
      })
      .catch(err => console.log('this dont work, heres why:' + err))
    })
  })
  .catch(err => console.log('this dont work, heres why: ' + err))
}

document.querySelector('form').addEventListener('submit', nasa);
