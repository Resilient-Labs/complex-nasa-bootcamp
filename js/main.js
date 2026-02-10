//Display the weather at the location of each nasa facility
//https://api.allorigins.win/raw?url=
//https://api.cors.lol/?url=https:

//----------------Used CHATGPT to get around rate limits, that didn't work, restarted, then used it to figure out why my data wasn't printing to the DOM-------------------------

//Get NASA facilities
//Get their lat/long
//take lat/long put into weather API
//print facility data + weather data

let tempLat = '37.911289';
let tempLon = '75.469622';

let kagi = '573e39e3da904aa38cf155148250310';
let nasa_url = `https://api.cors.lol/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`;
output = document.querySelector('#output');

const delay = ms => new Promise(r => setTimeout(r,ms));

document.querySelector('button').addEventListener('click',getLocations);

//alot of duplicates, need to parse them out first to clean up the data
async function getLocations() {
  try {
    const response = await fetch(nasa_url);
    const nasaData = await response.json();
//--------learned about this from here: https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep------
    //Only keep unique center names
    const uniqueAddresses = Array.from(new Set(nasaData.map(a => a.center)))
    .map(center => {
      return nasaData.find(a => a.center === center)
    })
    //console.log(uniqueAddresses);

    //separate individual facilities from the array
    for (const facility of uniqueAddresses) {
//---------turns out I can get the zip, way easier----------------
      const zip = facility.zipcode;
      const centName = facility.center;

      const weather = await getWeather(zip)
      //output.innerText = weather;

      const div = document.createElement('div');
      div.classList.add('facility');
      //div.textContent =`${facility.center}: ${weather.temp_f}°F`;
      div.textContent =`${centName}: ${weather.current.condition.text}, ${weather.current.temp_f}°F`; //changed from facility.center to centName
      output.appendChild(div);

//------CHATGPT helped setup this delay, which is now unnecessary but I kinda like it ngl----------------
      await delay(2000);
    }
  }
  catch (err) {
    console.error('error fetching nasa data', err);
  }
}

//async function getWeather(lat, lon) {
async function getWeather(zip) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${kagi}&q=${zip}`;

    const res = await fetch(url);
    const data = await res.json();
    //return data.current.condition.text;
    //console.log(data);
    console.log(zip);
    console.table(data);
    //return data.current.condition.text;

//---------CHATGPT helped here---------------
    return data;
  } catch (err) {
    console.error('Weather fetch error:', err);
    return null;
  }
}