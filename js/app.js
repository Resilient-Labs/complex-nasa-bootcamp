let button = document.querySelector('.submit')
let form = document.querySelector('.form')
let input = document.querySelector('.input')
let facility = document.getElementById('facility')
let tempDisplay = document.getElementById('tempDisplay')


const apiCall = () =>{
  let userAnswer = input.value
  fetch(`https://data.nasa.gov/resource/gvk9-iz74.json?`)
  .then( res => res.json())
  .then(data => {
    let filterData = data.filter((item, i) => {
      if (item.zipcode === userAnswer && item.status === "Active") {
        return item;
      }
    });
    let locations = "";
    filterData.forEach((item, i) => {
      console.log(item)
      let nameValue = item.facility;
      let zipValue = item.zipcode;
      let cityValue = item.city;

      let li = document.createElement("li");
      let addLi = document.createTextNode(`Name: ${nameValue} City: ${cityValue}`)
      console.log(li)
      li.appendChild(addLi);
      let something = document.body;
      something.appendChild(li)
      console.log(document.body)
    });



    facility.innerHTML = locations

  fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${userAnswer}&appid=1faef65356594f0917efa657c9cd77f7&units=imperial`)
    .then( res => res.json())
    .then(data => {
      let tempValue = data.main.temp;
      tempDisplay.innerHTML = `Weather: ${tempValue}`
    })
  })
}


button.addEventListener('click', apiCall);

form.addEventListener("submit", (event) => {
  event.preventDefault()
})
