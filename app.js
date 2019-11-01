const appID = '3739f783e04f55a655596109a6463b1d'

document.getElementById('twoAPI').addEventListener("submit", fetchUpdated)

function fetchUpdated(e) {
  e.preventDefault();
  // let character = this.elements.query.value;
  fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
  .then(res => res.json())
  .then(response => {
    var ul = document.querySelector('#make');
    for(let i = 0; i<response.length; i++){
        let cent = response[i].facility
        let input = response[i].city
        // console.log(cent)
        // console.log(input)
        let li = document.createElement("li");

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&APPID=${appID}`)
            .then(res => res.json())
            .then(response => {
              // let weather = response.main.temp + ' °F'
              let all = cent + "  |  " + input + "  |  " + response.main.temp;
              li.appendChild(document.createTextNode(all))
              ul.appendChild(li)
              // console.log(response.main.temp)
            })

          }
      })

  .catch(err => err)
}
