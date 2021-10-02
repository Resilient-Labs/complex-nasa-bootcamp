document.querySelector('button').addEventListener('click', getInfo)




function getInfo (){
    
    
    

    const nasalocations = "https://data.nasa.gov/resource/gvk9-iz74.json"

    fetch(nasalocations) 
        
        .then(res => res.json()) // parse response as JSON 
        .then(data => { 
        console.log(data.url) 
        console.log(data)
        for (let i = 0; i <= data.length; i++){
            let li = document.createElement('li');
            let span = document.createElement('span');
            span.className = 'weather'

            li.innerHTML = 
            `${data[i].center}, ${data[i].facility}, ${data[i].city}, ${data[i].state}. ${data[i].zipcode}`

            li.appendChild(span)
            document.querySelector('ol').appendChild(li);

            let weather = `https://api.openweathermap.org/data/2.5/weather?q=${data[i].city}, USA&units=imperial&appid=114091f0852c3d6b1adbfa85bf4106b7`

            fetch(weather)
            .then (res => res.json())
            .then(data =>{
                
                if (data && data.main && data.main.temp){
                    span.innerHTML = `The Temperature is  ${data.main.temp} `
                    
                } else{
                    span.innerHTML = "   Weather Data Not Available"
                }
                
            })
        }
        
        }) 
        .catch(err => { 
            console.log(`error ${err}`) 
        }); 
}