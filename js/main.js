//Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.



//interface 1 for facility location, name of facility.
const urlForSites = 'https://data.nasa.gov/resource/gvk9-iz74.json'

//create Fetch Syntax for facility
fetch(urlForSites)
.then(res => res.json())

//--------------------------------------scoped 
.then(data => {
    for(i=0 ; i<= 400 ; i++){
        console.log(data)
        let site = data[i].center //site
        let state = data[i].state //state
        let city = data[i].city //city
        let zip = data[i].zipcode.substring(0,5) //zip
        let country = data[i].country //country 

        //API KEY
        let api_Key = API_KEY

        //interface 2 for weather. Gets Zip and Country from above data
        const urlForWeather = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${api_Key}`
        

        //-------------------------second Fetch

        //create Fetch Syntax for weather
        fetch(urlForWeather)
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            data.main.temp  //shows temperature
            data.weather[0].description  //gives description of weather
            //pushes to DOM
            document.querySelector('#listOfSites').innerHTML +=`${site} is located at ${state}. The local temperature is ${data.main.temp} and here is a description of what the locals feel: ${data.weather[0].description}<br>` 
        })
        .catch(err => {
            console.log(`Error: ${err}`)
        });
        
        //-------------------------second Fetch

        
    
    }
})
//--------------------------------------scoped
.catch(err => {
    console.log(`Error: ${err}`)
});


//calls the function
//getTheGoods()





//string that combines center state city and location and weather