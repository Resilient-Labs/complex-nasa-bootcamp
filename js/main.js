fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
  .then(res => res.json())
  .then(data =>{
    console.log(data)
    let locations = document.querySelector("#locations")
    for (let i = 0; i < data.length; i++){
        let site = "<p>"; 
        site += data[i].center += ` `;
        site += data[i].facility += ` `; 
        site += data[i].location.latitude += ` `; 
        site += data[i].location.longitude += "</p>"; 
        locations.innerHTML += site
    }
})

.catch(err=> {
    console.log(`error $(err)`)
});   