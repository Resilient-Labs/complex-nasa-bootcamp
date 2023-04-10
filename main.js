document.querySelector('button').addEventListener('click', findFacilities,)

function findFacilities() {

  const url = `https://data.nasa.gov/resource/gvk9-iz74.json`

  console.log(url)

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data.length)
      for( let i = 0; i < data.length; i++){

        let city = data[0].city
        let center = data[i].center
        console.log(data[i].facility)
        let locations = document.getElementById('listFacilities')
        let list = document.createElement('li')
        const textNode = document.createTextNode(center);
        list.appendChild(textNode);
        locations.appendChild(list)

        list.innerText = ` ${data[i].center} and the Facility: ${data[i].facility} and the city ${data[0].city} `

        console.log(data[i].location.latitude)
        console.log(data[i].location.longitude)

        let lat = data[i].location.latitude
        let lon = data[i].location.longitude

        let secondurl = `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=6d3df2918af7ee709444c1ae7dd15ac6&units=imperial`
        
        console.log(secondurl)

        fetch(secondurl)
        .then(response => response.json())
        .then((data2) => {
          console.log(data2.main.temp)
          console.log(data2.weather[0].description)

          list.innerText += ` Weather ${data2.main.temp} and ${data2.weather[0].description}`
          
        });

        
      }
      
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


// https://api.openweathermap.org/data/2.5/weather?lon=-81.378879&lat=28.538331&appid=6d3df2918af7ee709444c1ae7dd15ac6

// const locations = document.getElementById('findFacilities')
//         // const list = document.createElement('li')
//         // locations.appendChild(li)