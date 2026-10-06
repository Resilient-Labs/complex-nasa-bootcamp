 document.querySelector('button').addEventListener('click',facilityList)
 
 function facilityList(){ 
    const urlOne = "https://cors.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json"
    const numFacilities = document.querySelector('select').value
    
    fetch(urlOne)
    .then(response => response.json())
    .then((data)=> {
        console.log(data)
  
        const newData = JSON.parse(data.body)
        console.log(newData)
        

        for(i =0; i <= numFacilities; i++){
           const column = document.createElement('tr')
           column.innerHTML = `<td>${newData[i].facility}</td>
           <td>${newData[i].city}, ${newData[i].state}</td>`
           document.querySelector('table').appendChild(column)
           
           const city = newData[i].city
           console.log(city)
           
           const apiKey = "aad22028d257486ebf6212358262209"
           const urlTwo = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

           fetch(urlTwo)
           .then(response => response.json())
           .then((data)=> {

            console.log(data.current.temp_f)

            console.log(data)
             const temperature = data.current.temp_f + "F"
             column.innerHTML += `<td>${temperature}</td>`

           })




        }

    

        })
    .catch(error =>{
        console.log(error)
    })  
    }

   

