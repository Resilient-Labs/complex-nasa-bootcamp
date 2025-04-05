document.querySelector("button").addEventListener("click", getPicture)


function getPicture() {
    const url = `https://data.nasa.gov/resource/gvk9-iz74.json`
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            for(let i = 0; i < data.length; i++){
        
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            let table = document.querySelector('table')
            table.appendChild(tr)
    
            let facility = document.createElement("td"); 
            facility.innerText = data[i].center; 
            tr.appendChild(facility)
         
            let location = document.createElement("td"); 
            location.innerText = `${data[i].city}, ${data[i].state} `
            tr.appendChild(location) 
            
            let newUrl = `https://wttr.in/${data[i].city}+${data[i].state}?format=j1`
            let weatherUrl= newUrl.replaceAll(" ", "+")
            fetch(weatherUrl)
    
            .then(res => res.json())
            .then(data => {
                
            let weather = document.createElement("td"); 
            weather.innerText = data["current_condition"][0].weatherDesc[0].value; 
            tr.appendChild(weather); 

            table.appendChild(tr)
        })}
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}