document.querySelector('button').addEventListener('click',getNasa)

function getNasa(){
    const url = `https://data.nasa.gov/resource/gvk9-iz74.json`
    fetch(url)
    .then(res => res.json())
    .then(data => { 
        console.log(data)
        console.log(data[0].facility)
        console.log(data[0].location.latitude)
        console.log(data[0].location.longitude)
        console.log(data.length)
            for(let i = 0; i < data.length; i++){
            
            let name = data[i].facility
            const tempUrl = `http://api.weatherapi.com/v1/current.json?key=82157bbf84b34b5398e165554221410&q=${data[i].location.latitude},${data[i].location.longitude}`
        
            
            fetch(tempUrl)
            .then(res => res.json()) // parse response as JSON 
            .then(data => { 
                console.log(name)
                console.log(data)
                console.log(data.current.temp_f)
                console.log(data.location.name)
                console.log(data.location.region)
                
                let p = document.createElement('p')
                p.innerText = `${name} || ${data.location.name},${data.location.region} || ${data.current.temp_f} F\u00B0`
                document.querySelector('h4').appendChild(p)
            }) 
            .catch(err => { 
                console.log(`error ${err}`) 
            });
        
            }

    
    }) 
    .catch(err => { 
      console.log(`error ${err}`) 
    });
}