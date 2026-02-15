// //declare variables 

// //get nasa locations
// //get weather

// //nasa api https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`;
// //weather url. weatherURL= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${weatherApiKey}`;
// //apikey APIkey= "f8c4c9fbfffe0029705c3398152d222f";

// //action button 

// document.querySelector('button').onclick = searchNASA
// // document.querySelector('button').onclick = getWEATHER
// // function called for search
// function searchNASA() {
//     const input = document.querySelector('input').value;
//     const url = `https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`;

//     fetch(url)
//         .then((res) => res.json())
//         .then((data) => {
//             for (let i = 0; i < data.length; i++) {
//                 console.log(data[i]);
//                 console.log(data[i].center);
//                 document.querySelector('h2').innerText = data[i].center;

//                 const center = data[i].center;
//                 const zipcode = data[i].zipcode;

                
//                 getWEATHER(zipcode).then((weather) => {
//                     const ul = document.getElementById("centers");
//                     const li = document.createElement("li");
//                     li.textContent = center + '  ' + zipcode + '  ' + weather;
//                     ul.appendChild(li);
//                 });
//             }
//         })
//         .catch((err) => console.error(err));
// }

// function getWEATHER(zipcode) {

//     const APIkey = "f8c4c9fbfffe0029705c3398152d222f";
//     const weatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&appid=${APIkey}`;

//     fetch(weatherURL)
//         .then((res) => res.json())
//         .then((data => {
//             console.log(data.main.temp);


//         }))
//         .catch((err) => console.error(err));
// }


document.querySelector('button').onclick = searchNASA;
// document.querySelector('button').onclick = getWEATHER
// function called for search
function searchNASA() {
    const input = document.querySelector('input').value;
    const url = `https://corsproxy.io/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                console.log(data[i].center);
                document.querySelector('h2').innerText = data[i].center;

                const center = data[i].center;
                const zipcode = data[i].zipcode;

                // Call getWEATHER and wait for it
                getWEATHER(zipcode).then((weather) => {
                    const ul = document.getElementById("centers");
                    const li = document.createElement("li");
                    li.textContent = center + '  ' + zipcode + '  ' + weather;
                    ul.appendChild(li);
                });
            }
        })
        .catch((err) => console.error(err));
}

function getWEATHER(zipcode) {
    const APIkey = "f8c4c9fbfffe0029705c3398152d222f";
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&appid=${APIkey}`;

    // Return the promise that resolves with temperature
    return fetch(weatherURL)
        .then((res) => res.json())
        .then((data) => {
            if (data.main && data.main.temp) {
                console.log(`Weather for ${zipcode}: ${data.main.temp}°F`);
                return `${data.main.temp}°F`;
            } else {
                console.warn(`No weather found for ${zipcode}`);
                return "No data";
            }
        })
        .catch((err) => {
            console.error(err);
            return "Error";
        });
}
