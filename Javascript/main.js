document.querySelector('button').addEventListener('click', facilities);
function facilities(){
  fetch(`https://data.nasa.gov/api/views/gvk9-iz74/rows.json?api_key=PX6KQodjwM0QXhS5JSHPYRAp7WyPGe8J2ui06hFi`)
  .then(res => res.json())
  .then(response =>{
    response.data.forEach(function(info){
      const list = document.querySelector('ul'),
      item = document.createElement('li');
      let facility = info[8],
      city = info[21],
      country = info[22],
      lat = info[20][1],
      lon = info[20][2];
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=83b5ead3b53a324059684ddae4a6776a`)
        .then(res => res.json())
        .then(response =>{
          let kel = response.main.temp,
          cel = kel-273,
          far = Math.round((1.8 * cel)+ 32);
          item.innerHTML =`The ${facility} is in ${city}, ${country} where the weather is ${far}&#8457;`
          list.appendChild(item);
      })
      .catch(err => console.log("You messed up, but don't worry, you'll weather the storm. Get it? Weather? Anyway, here's your error message:" + err))
    })
  })
  .catch(err => console.log('You messed up astronomically. Get it? NASA? Astronomically? Anyways, heres your error message: ' + err))
}
