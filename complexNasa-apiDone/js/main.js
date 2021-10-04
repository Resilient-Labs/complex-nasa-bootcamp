//Create a complex nasa api.

//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
// document.querySelector('button').addEventListener('click', startButton )
// // let date = document.querySelector('input').value

// function startButton(){
// let date = document.querySelector('input').value

const url = `https://data.nasa.gov/resource/gvk9-iz74.json`;
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < 485; i++){
    console.log(data[i]);
    // let newLi = document.createElement("li");
    // newLi.innerText
    // document.querySelector("ul").appendChild(newLi);
    // document.querySelector("h2").innerText = data[i].city;
    // document.querySelector("h3").innerText = data[i].center;
    let zipCode = data[i].zipcode;
    
   
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=284e49c9d91e84ee99980f3e8f07f935`;
    fetch(url)
      .then((res) => res.json())
      .then((weatherData) => {
        let newLi = document.createElement("li");
        newLi.innerText = data[i].city + ' | ' + data[i].zipcode + ' | ' + `${weatherData.main.temp}°Farenheight`
        document.querySelector("ul").appendChild(newLi);
        console.log(weatherData);
        console.log();
    //     document.querySelector(
    //       ".putHere"
    //     ).innerText = `${weatherData.main.temp}°Farenheight`;
      })
      ;}
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

// }
