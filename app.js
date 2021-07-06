document.querySelector('button').addEventListener('click', function () {
  // document.querySelector('.hide').style.display = "none";
  fetch('https://data.nasa.gov/resource/9g7e-7hzz.json?$select=facility,location,city,state')
    .then(res => res.json())
    .then(response => {
      const api_key = "d5283da9fdd1753984f8324195cd588b"
      const facilities = response;
      facilities.forEach(facility => {
        const longitude = facility.location.coordinates[0]
        const latitude = facility.location.coordinates[1]
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&APPID=${api_key}`)
          .then(res => res.json())
          .then((response) => {
            const temp = response.main.temp
            // console.log(temp)
            facility.temp = temp;
            displayFacility(facility);
          })
      })
    })
    .catch(err => {
      console.log(`error ${err}`)
      alert("sorry, there are no results for your search")
    })
})

function displayFacility(facility) {
  const table = document.getElementById('table');
  const row = document.createElement('tr');


  row.innerHTML = `
      <td class="data">${facility.facility}</td>
      <td class="data">${facility.city}</td>
      <td class="data">${facility.state}</td>
      <td class="data">${facility.temp}</td>
    `

  table.appendChild(row)
}


































// //ADD EVENT LISTENER TO YES button
// document.getElementById("button").addEventListener("click", () => {
//   fetch(`https://api.kanye.rest`)
//     .then(res => res.json())
//     .then(response => {
//       console.log(response.quote);
//       document.querySelector("p").innerHTML = response.quote
//
//       let api_key = "sXoqhVWmLvvgIgfePGe1YEA9uKWNwTcm"
//       fetch(`https://api.giphy.com/v1/gifs/random?apikey=${api_key}&tag=kanye&rating=R`)
//         .then(res => res.json())
//         .then(response => {
//           // console.log(response.data.url);
//           document.querySelector("img").src = response.data.url
//         })
//         .catch(err => {
//           console.log(`error ${err}`)
//           alert("sorry, there are no results for your search")
//         });
//     })
// })
