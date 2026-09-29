//Goal: Use NASA's API to return all of their facility locations (~400). 
// Display the name of the facility, its location, and the weather at the facility currently.

const api = "6180dced5f9e43cfad0180802262209"
const url = "https://api.weatherapi.com/v1/current.json"
const nasaURL = "https://corsproxy.io/?key=699c3693&url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json"

class NasaWeather { 
    constructor() { 
        this.facilitiesList= document.getElementById("facilities"); 
        this.getFacilities();

    }

    getFacilities() { 
        fetch(nasaURL)
        .then((res) => res.json())
        .then((data) => { 
            console.log(data); 

            data.forEach((facility) => { 


            const listItem = document.createElement("li"); 
            listItem.innerText = `${facility.facility} - ${facility.city}, ${facility.state}`;
            this.facilitiesList.appendChild(listItem); 

            //passing the location from API #1 to API #2
            if (facility.location) { 
                this.getWeather(facility.location.latitude, facility.location.longitude, listItem);
            }
        });
    })
    .catch((err) => console.log("error",err));

}

    getWeather(latitude,longitude,listItem) { 
        fetch(`${url}?key=${api}&q=${latitude},${longitude}`)
        .then((res) => res.json())
        .then((data) => { 
            listItem.innerText += ` | Weather Conditions: ${data.current.condition.text} | ${data.current.temp_f} F / ${data.current.temp_c} C`;        
        })
        .catch((err) => console.log("error:",err));
        }
    }

    const nasaWeather = new NasaWeather();