//The user will enter a name of facility and zip code to find weather at current location. Use that location to get the name of facility and weather of that facility location! https://data.nasa.gov/Management-Operations/NASA-Facilities/scmi-np9r

//connect button  function "getTemp"
document.querySelector("button").addEventListener("click", getFacilityNameWeather);



function getFacilityNameWeather() {
  document.querySelector(".table").id = "hidden";

  const urlNasa = 'https://data.nasa.gov/resource/gvk9-iz74.json';
  

  //using method fetch to request my data from that api using url
  fetch(urlNasa) // go get api
    .then((res) =>  res.json())
    .then((data) => {
    
      console.log(data);
      
      let index = 1; // Counter for Table Rows
      
      data.forEach((facility)=>{ 
        console.log(facility);
        let facilityCenter = facility.center;//calling api for facilities
        let zipCode = facility.zipcode;//callling api for zipcode

        const urlZip = `http://api.weatherapi.com/v1/current.json?key=eb88852a78b84a5ab07191927231810&q=${zipCode}`;

        fetch(urlZip) // go get api
          .then((res) => res.json()) //.then property passes param res which responds with JSON parsing out the data you requested
          .then((data) => {
            let temp = Math.floor(data.current.temp_f); //using method to round current temp of F
            let fTemp = `${temp}°F`;

            // let listFacility = document.createElement("li");
            // let text = document.createTextNode(`${facilityCenter} ${fTemp}`);
            // listFacility.appendChild(text);
            // document.querySelector("#list").appendChild(listFacility);

            // <tr>
            //   <th scope="row">1</th>
            //   <td>Mark</td>
            //   <td>Otto</td>
            // </tr>

            let tableIndex = document.createElement("th"); // creating ELement table header for table
            tableIndex.scope = "row"; //
            tableIndex.innerText = index; //start at index 1
            index++; // then increment as we add

            // console.log("th element:" );
            // console.log(tableIndex);

            let tableDataOne = document.createElement("td");
            tableDataOne.innerText = facilityCenter;
            // console.log("facility Name :")
            // console.log(tableDataOne);

            let tableDataTwo = document.createElement("td");
            tableDataTwo.innerText = fTemp;

            let tableDataThree = document.createElement("td");
            tableDataThree.innerText = zipCode;

            let tableRow = document.createElement("tr");
            tableRow.appendChild(tableIndex);
            tableRow.appendChild(tableDataOne);
            tableRow.appendChild(tableDataTwo);
            tableRow.appendChild(tableDataThree);

            console.log("Table Row :")
            console.log(tableRow)

            document.querySelector("tbody").appendChild(tableRow);


          })
          .catch((err) => {
            console.log(`error ${err}`);
          });
      })

      document.querySelector("#hidden").id = "";
    })
}

