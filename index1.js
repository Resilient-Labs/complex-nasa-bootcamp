document.querySelector("button").addEventListener("click", mood);

function mood() {
  //api#1
  fetch("https://data.nasa.gov/resource/gvk9-iz74.json")
    .then((response) => response.json())
    .then((data) => {
      let container = document.querySelector(".list");

      let ul = document.querySelector("ul");

    for (let i = 0; i < data.length; i++) {
        let facility = data[i].facility;
        let zipcode = data[i].zipcode;

        let li = document.createElement("li");
        li.innerText = `${facility}, ${zipcode},`;
        ul.appendChild(li);

        //What is a dynamic variable?

        // let zipCodeInfo = data[i].zipcode
        // document.querySelector('.list').innerHTML = zipCodeInfo
        console.log(data[i]);
        console.log(data[i].zipcode);

        // take the 2nd api call & do another for loop again to iterate over the data for the li's

        let secondApiUrl = `http://api.weatherapi.com/v1/current.json?key=c584f778965044afa14222305232010&q=${zipcode}`;

        fetch(secondApiUrl)
          .then((res) => res.json())
          .then((weatherData) => {
            let tempArea = weatherData.current.temp_f;

            // document.querySelector('ul')current.temp_f.innerText;
            // let weather = current.temp_f
            // console.log(weather)

            //how can i select a unique li in a loop element?
            let currentLi = document.createElement("li");
            currentLi.innerText = `${tempArea}°F`;
            ul.appendChild(currentLi);

            // currentLi.innerText = `${facility}, ${zipcode}, ${tempArea}`;
            
            //To remember this is called appending , When you're adding stuff to an exsisting string

            // liSecond.innerText = `${tempArea},`
            // ul.appendChild(li)

            // console.log('Fat big tall hotdog')
            // console.log(data[i].zipcode)
            // console.log(weatherData);
          })

          .catch((error) => {
            console.error("Error: ", error);
          });
    }
    });
}

//Old method my issue was i was going to declare everything & assign it when i had already had a ul element to list everything

//appending works too but this list is alot simpler
// let facility = document.createElement('ul')
// facility.innerText = data[i].facility

// let p = document.createElement('p');
// p.innerText = data[i].zipcode

// container.appendChild(facility);
// container.appendChild(p);
