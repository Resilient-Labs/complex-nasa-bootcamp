document.querySelector("button").addEventListener("click", getFacility);

function getFacility() {
  const weatherAPIKey = "b60047c35f26924b2db7404518a51f21";

  let url = `https://data.nasa.gov/resource/gvk9-iz74.json`;

  fetch(url)
    .then((res) => res.json())
    .then((facilityData) => {
      console.log(facilityData);

      // nested fetch
      // start a for loop to iterate it through the array
        for (let i = 0; i < facilityData.length; i++){ 
            // document.createElement('p')
    
            let paragraph = document.createElement('p') // creating a paragraph element and we are assigning it to a variable named paragraph
            paragraph.innerText = facilityData[i].facility 
            //we are taking the i'th(programming lingo) element from the facilityData array and from that element we are thaen taking the value of that facility property, then we are assigning the value of the innertext property of the paragraph to the facility value property of that one element 

            // we're taking the element of the facilityData array at position i 

            // words like element and position are very helpful when talking about arrays

            let body = document.querySelector('body') //we're asking the document for the body element and we''re assigning it to the variable named body
            body.appendChild(paragraph) //the paragraph is being appended to the element 


            let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${facilityData[i].location.latitude}&lon=${facilityData[i].location.longitude}&appid=${weatherAPIKey}&units=imperial`;

            fetch(weatherUrl)

            .then((res) => res.json())
            .then((wData) => {
              console.log(wData)
              // console.log("weather", wData.weather[0].description);

              // paragraph.innerText += ' ' + wData.main.temp + ' ' + wData.weather[0].description
              //this is how you write things in template literal form: 
              paragraph.innerText += `Temperature: ${wData.main.temp}          Description:${wData.weather[0].description}`
              //then I appended the weather date description to the innertext of that paragraph element
                
              // tips from Mark: learn how to zoom in and zoom out - learn how to group things together into blocks/classes/functions 
              // functions are abstractions - go into detail if the recruiter/senior SWE is asking specifically 
                


              // This is code from working with Chris Owen's, the mentor: 
              // you want to add a new line for each
            //   document.querySelector("h2").innerText =
            //     facilityData[0].center +
            //     " " +
            //     facilityData[0].location.latitude +
            //     " " +
            //     facilityData[0].location.longitude +
            //     " " +
            //     wData.main.temp +
            //     " " +
            //     wData.weather[0].description;
            });
    
        }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
