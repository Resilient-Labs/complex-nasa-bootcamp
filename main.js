//use NASA's API to return all of their facility locations (~400).
//Display the name of the facility, its location, and the weather at the facility currently

//listen for click, call the api


//worked on it with Rumi (Marquis), Justin Joshi, Leanne, Godwin, ...

//Karim helped me debug the code

//declare variables
document.querySelector('button').addEventListener('click', getFacilities);
const apiKey= "d23e009d9e3c420522a7d9b1300082d7";//key for the weather
const url= "https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json";

//get NASA facilities
function getFacilities(){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data[0], typeof(data));
        data.forEach(i => getWeather(i))//i represents each one of the ~400 locations
    })
    .catch(err=>{
        console.log(`error ${err}`);
    })
}
//get the weather
function getWeather(i){
    let weatherUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${i.location.latitude}&lon=${i.location.longitude}&units=imperial&appid=${apiKey}`;
    fetch(weatherUrl)
        .then(res => res.json())
        .then(weatherdata=>{
            console.log(weatherdata);
            document.querySelector('.facilities').innerHTML += `<li>${i.center} - ${i.city}, ${i.state}. Current Weather: ${weatherdata.weather[0].description} and Temp: ${weatherdata.main.temp} °F</li>`;
        })
         .catch(err=>{
        console.log(`error ${err}`);
    })
            

}
