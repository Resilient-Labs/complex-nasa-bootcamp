let ul = document.querySelector('ul')
fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
  .then(res => res.json())
  .then(response => {
    response.forEach((x) => {
      let lat = x.location.latitude
      let lon = x.location.longitude
      fetch(`https://api.weatherbit.io/v2.0/current?key=${key}&lat=${lat}&lon=${lon}&units=I`)
        .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
        .then(response => {
          let center = document.createElement('li')
          let location = document.createElement('p')
          let temp = document.createElement('p')
          center.appendChild(document.createTextNode(x.center))
          location.appendChild(document.createTextNode(`${x.city}, ${x.state}`))
          temp.appendChild(document.createTextNode(response.data[0].temp))
          ul.appendChild(center)
          ul.appendChild(location)
          ul.appendChild(temp)
          // console.log(x.center);
          // console.log(`${x.city}, ${x.state}`);
          // console.log(response.data[0].temp);
        })
        .catch(err => {
          console.log(`error ${err}`)
        });
    })
  })
  .catch(err => {
    console.log(`error ${err}`);
  })
