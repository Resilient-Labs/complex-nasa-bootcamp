//Did this API with my group, Randi really helped me to understand
//Found out that there were some facilities that were provided by the nasa website weren't in the API, so the one's not included are commented out.
document.querySelector('button').addEventListener('click', getNasaFac)
//list of the Nasa facilities/locations
//creating empty  array's for each of the nasa facilities
//changed the arrays to objects
let locations = {
    ames: [],
    arm: [],
    glen: [],
    god: [],
    // godd: [],
    // kath: [],
    jet: [],
    john: [],
    ken: [],
    lang: [],
    marsh: [],
    // mary: [],
    mich: [],
    nasa: [],
    // neil: [],
    sten: [],
    wall: [],
    // white: [],
}
    //my function for fetching and sorting out all the info in my API
    function getNasaFac(){
    const url = (`https://data.nasa.gov/resource/gvk9-iz74.json`)
    fetch(url) 
        .then(res => res.json()) // parse response as JSON 
        .then(data => { //myself calling the array I'm getting: data 
            console.log(data) // make sure everything is working 
            //the second data is what it's actually called in an array from the api, I had to add the first data because I had to address what I called the array
            //push to correct center
            for(const fac of data){
                if(fac.center === 'Ames Research Center'){
                    locations.ames.push(fac)
                    // console.log(locations.ames, 'fuck')
                }
                if(fac.center === 'Armstrong Flight Research Center'){
                    locations.arm.push(fac)
                    // console.log(locations.arm, 'around')
                }
                if(fac.center === 'Glenn Research Center'){
                    locations.glen.push(fac)
                    // console.log(locations.glen)
                }
                if(fac.center === 'Goddard Space Flight Center'){
                    locations.god.push(fac)
                //     console.log(locations.god)
                }
                // if(fac.center === ''){
                //     locations.godd.push(fac)
                //     console.log(locations.godd)
                // }
                // if(fac.center === 'Katherine Johnson IV and V Facility'){
                //     locations.kath.push(fac)
                //     console.log(locations.kath)
                // }
                if(fac.center === 'Jet Propulsion Lab'){
                    locations.jet.push(fac)
                    // console.log(locations.jet)
                }
                if(fac.center === 'Johnson Space Center'){
                    locations.john.push(fac)
                    // console.log(locations.john)
                }
                
                if(fac.center === 'Kennedy Space Center'){
                    locations.ken.push(fac)
                    // console.log(locations.ken)
                }
                if(fac.center === 'Langley Research Center'){
                    locations.lang.push(fac)
                    // console.log(locations.lang)
                }
                if(fac.center === 'Marshall Space Flight Center'){
                    locations.marsh.push(fac)
                    // console.log(locations.marsh)
                }
                if(fac.center === 'Mary W. Jackson NASA Headquarters'){
                    locations.mary.push(fac)
                    // console.log(locations.mary)
                }
                if(fac.center === 'Michoud Assembly Facility'){
                    locations.mich.push(fac)
                    // console.log(locations.mich)
                }
                if(fac.center === 'NASA Aircraft Management Division'){
                    locations.nasa.push(fac)
                    // console.log(locations.nasa)
                }
                // if(fac.center === 'Neil A. Armstrong Test Facility'){
                //     locations.neil.push(fac)
                //     console.log(locations.neil)
                // }
                if(fac.center === 'Stennis Space Center'){
                    locations.sten.push(fac)
                    // console.log(locations.sten)
                }
                if(fac.center === 'Wallops Flight Facility/GSFC'){
                    locations.wall.push(fac)
                    console.log(locations.wall)
                }
                if(fac.center === 'White Sands Test Facility'){
                    locations.white.push(fac)
                    // console.log(locations.white)
                }
            }
            
            //checking to see if shit works
            // console.log(data, 'all data') //all data
            // console.log(locations.god, 'nasa') // gives data for fac center
            // console.log(locations.god[0].zipcode) //zipcode for the facility


            function getWeather(){
                const select = document.querySelector('select').value
                const dropDown = locations[select][0].zipcode
                console.log(dropDown)
                const url = (`https://api.weatherbit.io/v2.0/current?&postal_code=${dropDown}&country=US&key=3f06edb8e23f45e88af9eab94d89bc98&include=minutely&units=I`)
                fetch(url) 
                    .then(res => res.json()) // parse response as JSON 
                    .then(data => { //myself calling the array I'm getting: data 
                        console.log(data.data) //checking to make sure retrival of the weather is working
                        console.log(data.data[0].app_temp)//checking to see if retrieving only the temp works
                        document.querySelector('h2').innerText = data.data[0].app_temp
                        
                        
                    }) 
                    .catch(err => { 
                        console.log(`error ${err}`) 
                    })
            } 
            getWeather()
        }) 
        .catch(err => { 
            console.log(`error ${err}`) 
        })
    }
    