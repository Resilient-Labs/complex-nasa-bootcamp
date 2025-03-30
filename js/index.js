
// Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.

let sectionOneUL = document.getElementById("sectionOneUL");
let button = document.querySelector("input").addEventListener("click", getLocation)
let sectionTwoUL = document.getElementById('sectionTwoUL');


async function setWeather(lat, log){
    try{
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${log}&hourly=temperature_2m&forecast_days=1&ref=freepublicapis.com`)
        if(!response.ok){
            throw new Error("Resource not found");
        }
    
        const data = await response.json();
        console.log(data)
        return data;
    }
    catch(error){
        console.log(error)
    }
   
}

async function getLocation(){
    let sectionOneTemp = {};
    let sectionTwoTemp = {};


    try{
        const response = await fetch('https://data.nasa.gov/resource/gvk9-iz74.json');
        if(!response.ok){
            throw new Error("Resource not found")
        }

        const data = await response.json()
    
        for(let i = 0; i < 249; i++){
            let currentLI = document.createElement("li");
            currentLI.classList.add("liSectionOne");
            sectionOneTemp[i] = [data[i].location.latitude,data[i].location.longitude ]
            let v = await (setWeather(sectionOneTemp[i][0], sectionOneTemp[i][0]).then((x) =>{
                let d = new Date;
                return `${x.hourly.temperature_2m[d.getHours()]} ${x.hourly_units.temperature_2m}`
                
            }));
            currentLI.innerHTML = `${data[i].center} | ${data[i].facility} | Temp: ${v}`
            sectionOneUL.appendChild(currentLI);
        }
        for(let i = 250; i < 484; i++){
            let currentLI = document.createElement("li");
            currentLI.classList.add("liSectionTwo");
            let v = await (setWeather(sectionOneTemp[i][0], sectionOneTemp[i][0]).then((x) =>{
                let d = new Date;
                return `${x.hourly.temperature_2m[d.getHours()]} ${x.hourly_units.temperature_2m}`
                
            }));
            currentLI.innerHTML = `${data[i].center} | ${data[i].facility} | Temp: ${v}`;
            sectionTwoUL.appendChild(currentLI);
            sectionTwoTemp[i] = [data[i].location.latitude,data[i].location.longitude]
        }


        console.log(v)

        console.log(data)
        return data;
    }
    catch(error){
        console.log(error);
    }
}



// Put the location


