const ul = document.getElementById('listFacility');

function getWeather(e){
  let lat = e.target.previousSibling.previousSibling.innerHTML.slice(-8).trim()
  let lon = e.target.previousSibling.innerHTML.slice(-8).trim()
  console.log(lon);
  console.log(lat);
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=43e89931db46aeed7212f52d54cee99e&units=imperial`)
    .then(res => res.json())
    .then(data => {
      let fahrenheit = data.main.temp
      let temp = Math.floor(fahrenheit) + "°" + "F"
      console.log(temp);

      const tempNode = document.createTextNode(temp)
      const tempLi = document.createElement('li')
      tempLi.appendChild(tempNode)

      let selectedIndex = e.target.id

      let newList = ul.children[selectedIndex]
      newList.firstChild.insertBefore(tempLi, newList.firstChild.lastChild);
    })
}

fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
.then(response => response.json())
.then(data => {
  let facilities = []
  const ul = document.getElementById('listFacility')

  data.forEach((facility, index) => { //facility = item
    facilities.push({
      facility: data[index].facility,
      center: data[index].center,
      city: data[index].city,
      state: data[index].state,
      latitude:data[index].location.latitude,
      longitude:facility.location.longitude

    })
    const liNew = document.createElement('li')
    liNew.classList.add('eachFacility')
    ul.appendChild(liNew)   //adds li to ul


    let facilityList = document.createElement('ul')  //to append to the li above

    let facilityName = document.createElement('li')
    let centerName = document.createElement('li')
    let locationName = document.createElement('li')
    let latitudeLi= document.createElement('li')
    let longitudeLi= document.createElement('li')



    let weatherButton = document.createElement('button')
    weatherButton.classList.add('listButton')
    weatherButton.setAttribute('id', index)
    weatherButton.addEventListener('click', getWeather)

    let facilityNode = document.createTextNode("Facility Name: " + facilities[index].facility)   //which facility? SEE
    let centerNode = document.createTextNode("Center: " + facilities[index].center)
    let locationNode = document.createTextNode("Location: " + facilities[index].city + ", " + data[index].state)
    let buttonNode = document.createTextNode('See Weather')

    let latNum=parseFloat(facilities[index].latitude).toFixed(4); // turns latitudes key value into a float, to the fourth decimal place
    let lonNum=parseFloat(facilities[index].longitude).toFixed(4);

    let latitudeNode=document.createTextNode("Latitude: " + latNum)
    let longitudeNode=document.createTextNode("Longitude: " + lonNum)

    facilityName.appendChild(facilityNode)

    //
    centerName.appendChild(centerNode)
    locationName.appendChild(locationNode)
    latitudeLi.appendChild(latitudeNode)
    longitudeLi.appendChild(longitudeNode)
    weatherButton.appendChild(buttonNode)
    //
    facilityList.appendChild(facilityName)
    facilityList.appendChild(centerName)
    facilityList.appendChild(locationName)
    facilityList.appendChild(latitudeLi)
    facilityList.appendChild(longitudeLi)
    facilityList.appendChild(weatherButton)

    liNew.appendChild(facilityList);
  })
})
