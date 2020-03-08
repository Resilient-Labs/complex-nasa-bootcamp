document.querySelector("#centerName").value
const ul = document.querySelector("ul")
const apiKey = "c2dd4c00faa746c74724edfe9877d1bc"
// creating a set because we are checking for duplicates
// let locationSet = new Set()

function getNasaLocationWeather (location, i){
  // needed all zipcodes to be max 5 digits, used the slice method, start at 0, end at 5(exclusive)
    let zip = location.zipcode.slice(0,5)

  // if the new set called locationSet already contains ((.has)) that location(name)
    // if (locationSet.has(location.center)){
    //   // do nothing
    //   return
    // }
    // .add is similar to .append
    // locationSet.add(location.center)
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}&units=imperial`)
      .then(res => res.json())
      .then(weather => {
        let locationWeather = weather.main.temp
        let li = document.createElement("li") //built in element thats create element so you have a click event that creates a new li; if the input is null, you might want to add something to say a value is entered
        let listItem = document.querySelector("#centerName").textContent = `The NASA ${location.center}, ${location.facility} is located in ${location.city},
        ${location.state} and the temperature today is ${locationWeather}`
        ul.appendChild(li);// for the ul, want to append the children into the ul to make the li (this li calls upon the variable stated above)
        li.appendChild(document.createTextNode(listItem)); // now w these li, create a text node which is the list item and create that list item variable, take in each of the grocery items you are putting in
      })

}

fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
  .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
  .then(stations => {
    stations.forEach( getNasaLocationWeather )
    }
    )
.catch(err => {
      console.log(`error ${err}`)
      alert("sorry, there are no results for your search")
  });
