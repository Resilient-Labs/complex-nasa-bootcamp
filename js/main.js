/* Goal: Use NASA's API to return all of their facility locations (~400). 
Display the name of the facility, 
its location, 
and the weather at the facility currently.

*/

// Michael Kazin and I did this project together from laying out structure to getting it to work.

// const FacName = data.facility
// const city = data.city
const country = "US"
API_url = 'https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json'

async function getCenter () {
    const country = "US"
    const res = await fetch(API_url)
  /*  const data = [  {
        "center": "Kennedy Space Center",
        "center_search_status": "Public",
        "facility": "Control Room 2/1726/HGR-S ",
        "occupied": "1957-01-01T00:00:00.000",
        "record_date": "1996-03-01T00:00:00.000",
        "last_update": "2015-06-22T00:00:00.000",
        "country": "US",
        "contact": "Sheryl Chaffee",
        "phone": "321-867-8047",
        "location": {
          "latitude": "28.538331",
          "longitude": "-81.378879",
          "human_address": "{\"address\": \"\", \"city\": \"\", \"state\": \"\", \"zip\": \"32899\"}"
        },
        "city": "Kennedy Space Center",
        "state": "FL",
        "zipcode": "32899",
        ":@computed_region_bigw_e76g": "173",
        ":@computed_region_cbhk_fwbd": "30",
        ":@computed_region_nnqa_25f4": "1078"
      } , {
        "center": "Langley Research Center",
        "center_search_status": "Public",
        "facility": "Micometeroid/LDEF Analysis Laboratory",
        "occupied": "1965-01-01T00:00:00.000",
        "status": "Active",
        "record_date": "1996-03-01T00:00:00.000",
        "last_update": "2013-02-25T00:00:00.000",
        "country": "US",
        "contact": "Sherry Johnson",
        "phone": "757.864-3848",
        "location": {
          "latitude": "37.08681",
          "longitude": "-76.376649",
          "human_address": "{\"address\": \"\", \"city\": \"\", \"state\": \"\", \"zip\": \"23681-2199\"}"
        },
        "city": "Hampton",
        "state": "VA",
        "zipcode": "23681-2199",
        ":@computed_region_bigw_e76g": "173",
        ":@computed_region_cbhk_fwbd": "40",
        ":@computed_region_nnqa_25f4": "2913"
      },
      {
        "center": "Kennedy Space Center",
        "center_search_status": "Public",
        "facility": "SRM Rotation and Processing Facility/K6-0494 ",
        "occupied": "1984-01-01T00:00:00.000",
        "record_date": "1996-03-01T00:00:00.000",
        "last_update": "2015-06-22T00:00:00.000",
        "country": "US",
        "contact": "Sheryl Chaffee",
        "phone": "321-867-8047",
        "location": {
          "latitude": "28.538331",
          "longitude": "-81.378879",
          "human_address": "{\"address\": \"\", \"city\": \"\", \"state\": \"\", \"zip\": \"32899\"}"
        },
        "city": "Kennedy Space Center",
        "state": "FL",
        "zipcode": "32899",
        ":@computed_region_bigw_e76g": "173",
        ":@computed_region_cbhk_fwbd": "30",
        ":@computed_region_nnqa_25f4": "1078"
      },] */
            const data = await res.json()
            for (let i=0; i<data.length; i++){
                const FacName = data[i].facility
                const zip = data[i].zipcode.split('-')[0]
                const temp = await getWeather(zip, country)
               let newListing = document.createElement('li')
               newListing.innerText = FacName + zip + " " + country + " " + temp
                document.querySelector('ul').appendChild(newListing)
        }
    }    

const weatherCache = {

}

async function getWeather (zip, country) {  
    console.log('getweather')
    key=zip+country
   if (!Object.hasOwn(weatherCache,key)){
    console.log('cachemiss')
    await fetchWeather(zip, country)
   }
   console.log('returnvalue')
   return weatherCache[key]   
}

async function fetchWeather (zip, country){
    console.log('fetchweather')
    const apiKey = "e0b2a9491e2774b97bb54f7445436204"
    const url =  `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${apiKey}&units=imperial`
    await fetch (url)
        .then (res => res.json ())
        .then (data => {
            console.log(data);
            key=zip+country
            weatherCache[key] = data.main.temp
            console.log('cachingkey')
        })
        .catch (error => {
            console.log(`error ${error}`);
        }) 
    
    }


    getCenter()
// getWeather("02136", country)
// Promises - A kind of object

/*

Stubbed - [using locally generated data] - bc NASA API is very slow and Asyncs [need to read up on Asyncs] were done to get the weather
We were getting the weather from inside a fetch and you can't call return without that
*/