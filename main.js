const WEATHER_API_KEY = ""; // ADD KEY

// NASA may have updated endpoint, now blocked by CORS. Searched for how to bypass CORS without adding a backend/server and found this post: https://www.descope.com/blog/post/cors-errors => then googled cors proxies and found this: https://cors.lol/ and https://corsproxy.io

const nasaURL = `https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`;

fetch(nasaURL)
  .then((res) => res.json())
  .then((data) => {
    // Comment out fetch call and use object below for testing to prevent getting rate limited
    // const data = [
    //   {
    //     center: "Kennedy Space Center",
    //     center_search_status: "Public",
    //     facility: "Control Room 2/1726/HGR-S ",
    //     occupied: "1957-01-01T00:00:00.000",
    //     record_date: "1996-03-01T00:00:00.000",
    //     last_update: "2015-06-22T00:00:00.000",
    //     country: "US",
    //     contact: "Sheryl Chaffee",
    //     phone: "321-867-8047",
    //     location: {
    //       latitude: "28.538331",
    //       longitude: "-81.378879",
    //       human_address:
    //         '{"address": "", "city": "", "state": "", "zip": "32899"}',
    //     },
    //     city: "Kennedy Space Center",
    //     state: "FL",
    //     zipcode: "32899",
    //     ":@computed_region_bigw_e76g": "173",
    //     ":@computed_region_cbhk_fwbd": "30",
    //     ":@computed_region_nnqa_25f4": "1078",
    //   },
    //   {
    //     center: "Langley Research Center",
    //     center_search_status: "Public",
    //     facility: "Micometeroid/LDEF Analysis Laboratory",
    //     occupied: "1965-01-01T00:00:00.000",
    //     status: "Active",
    //     record_date: "1996-03-01T00:00:00.000",
    //     last_update: "2013-02-25T00:00:00.000",
    //     country: "US",
    //     contact: "Sherry Johnson",
    //     phone: "757.864-3848",
    //     location: {
    //       latitude: "37.08681",
    //       longitude: "-76.376649",
    //       human_address:
    //         '{"address": "", "city": "", "state": "", "zip": "23681-2199"}',
    //     },
    //     city: "Hampton",
    //     state: "VA",
    //     zipcode: "23681-2199",
    //     ":@computed_region_bigw_e76g": "173",
    //     ":@computed_region_cbhk_fwbd": "40",
    //     ":@computed_region_nnqa_25f4": "2913",
    //   },
    // ];
    data.forEach((place) => {
      // Get facility name + location
      const { facility, center, city, state, country, zipcode } = place;
      const zip = zipcode.split("-")[0];

      // Get weather
      const weatherURL = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${zip}`;
      fetch(weatherURL)
        .then((res) => res.json())
        .then((data) => {
          // Comment out fetch call and use object below for testing to prevent getting rate limited
          // const data = {
          //   location: {
          //     name: "Orlando",
          //     region: "Florida",
          //     country: "USA",
          //     lat: 28.3066997528076,
          //     lon: -80.6862030029297,
          //     tz_id: "America/New_York",
          //     localtime_epoch: 1759750427,
          //     localtime: "2025-10-06 07:33",
          //   },
          //   current: {
          //     last_updated_epoch: 1759750200,
          //     last_updated: "2025-10-06 07:30",
          //     temp_c: 26.7,
          //     temp_f: 80.1,
          //     is_day: 1,
          //     condition: {
          //       text: "Partly Cloudy",
          //       icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
          //       code: 1003,
          //     },
          //     wind_mph: 12.5,
          //     wind_kph: 20.2,
          //     wind_degree: 93,
          //     wind_dir: "E",
          //     pressure_mb: 1014,
          //     pressure_in: 29.94,
          //     precip_mm: 0,
          //     precip_in: 0,
          //     humidity: 84,
          //     cloud: 0,
          //     feelslike_c: 30.4,
          //     feelslike_f: 86.7,
          //     windchill_c: 25.3,
          //     windchill_f: 77.5,
          //     heatindex_c: 27.9,
          //     heatindex_f: 82.2,
          //     dewpoint_c: 22.5,
          //     dewpoint_f: 72.6,
          //     vis_km: 16,
          //     vis_miles: 9,
          //     uv: 0,
          //     gust_mph: 24.8,
          //     gust_kph: 39.9,
          //     short_rad: 0,
          //     diff_rad: 0,
          //     dni: 0,
          //     gti: 0,
          //   },
          // };
          const { condition, temp_f, temp_c } = data.current;

          // Add name, location, + weather to the DOM
          const section = document.createElement("section");
          section.classList.add("card");
          section.innerHTML = `
            <img src=${"https:" + condition.icon} alt="Weather icon" />
            <p>${temp_f}°F (${temp_c}°C)</p>
            <p>${facility}</p>
            <p>${center}</p>
            <p><span>${city}, ${state}, ${zip} ${country}</span></p>
          `;
          document.getElementById("container").appendChild(section);
        });
    });
  })
  .catch((err) => console.error(err));
