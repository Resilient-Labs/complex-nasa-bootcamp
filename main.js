  document.querySelector('button').addEventListener('click', function () {
    fetch('https://data.nasa.gov/resource/9g7e-7hzz.json?$select=facility,location,city,state')
      .then(res => res.json())
      .then(response => {
        const apikey = "72f0b58eb06d0d19d3dcea57046e6ede"
        const locations = response;
        locations.forEach(facility => {
          const longitude = facility.location.coordinates[0]
          const latitude = facility.location.coordinates[1]
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&APPID=${apikey}`)
            .then(res => res.json())
            .then((response) => {
              const temp = (response.main.temp + "°F")
              facility.temp = temp;
              showlocation(facility);
            })
        })
      })
      .catch(err => {
        console.log(`error ${err}`)
        alert("Sorry, there are no results for your search.")
      })
  })

  function showlocation(facility) {
    const table = document.getElementById('table');
    const row = document.createElement('tr');


    row.innerHTML =
        `<td>${facility.facility}</td>
        <td>${facility.city}</td>
        <td>${facility.state}</td>
        <td>${facility.temp}</td>`

    table.appendChild(row)
  }
