// Goal: Use NASA's API to return all of their facility locations (~400).
// Display the name of the facility, its location, and the weather at the facility currently.
document.querySelector("#centerName").value
const ul = document.querySelector("ul")


fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
  .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then(stations => {
    stations.forEach( (location, i) => {
      let zip = location.zipcode
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=112b7296f18313c8a2da4652f6171d42&units=imperial`)
        .then(res => res.json())
        .then(weather => {
          let locationWeather = weather.main.temp
          let li = document.createElement("li") //built in element thats create element so you have a click event that creates a new li; if the input is null, you might want to add something to say a value is entered
          let listItem = document.querySelector("#centerName").textContent = `The NASA ${location.center} is located in ${location.city}, ${location.state} and the temperature today is ${locationWeather}`
          ul.appendChild(li);// for the ul, want to append the children into the ul to make the li (this li calls upon the variable stated above)
          li.appendChild(document.createTextNode(listItem)); // now w these li, create a text node which is the list item and create that list item variable, take in each of the grocery items you are putting in
        })
    })
    }
    )
.catch(err => {
      console.log(`error ${err}`)
      alert("sorry, there are no results for your search")
  });





    // fetch(`api.openweathermap.org/data/2.5/weather?q={city name},{state}&appid=ef36e97e996b598e00a44314fe0f09ba&units=imperial`)
    //       .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    //       .then(response => {
    //         paragraph.textContent = response.weather[0].description
    //         console.log(response.weather[0].description)
    //       })
    //       .catch(err => {
    //           console.log(`error ${err}`)
    //           alert("sorry, there are no results for your search")
    //       });
    //
    //
    // //
    // document.querySelector("#centerName").value
    // const ul = document.querySelector("ul")
    //
    //   fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
    //     .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    //     .then(response => {
    //       let i = 0;
    //       let listItem = document.querySelector("#centerName").textContent = response[i].center //each of these inputs, takes the text value and puts it into the new li;check whats actually written not just the box itself
    //         while(i <= 401 && listItem !== 1){
    //           let li = document.createElement("li") //built in element thats create element so you have a click event that creates a new li; if the input is null, you might want to add something to say a value is entered
    //           ul.appendChild(li);// for the ul, want to append the children into the ul to make the li (this li calls upon the variable stated above)
    //           li.appendChild(document.createTextNode(listItem)); // now w these li, create a text node which is the list item and create that list item variable, take in each of the grocery items you are putting in
    //           i++;
    //         }
    //         console.log("This is a " + response[i].zipcode)
    //         }
    //
    //       )
    //     .catch(err => {
    //         console.log(`error ${err}`)
    //         alert("sorry, there are no results for your search")
    //     });
