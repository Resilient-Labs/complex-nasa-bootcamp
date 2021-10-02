document.querySelector('.nasa').addEventListener('click', getData)

function getData(){
    const ul = document.querySelector('ul')
    
    
    fetch('https://data.nasa.gov/resource/gvk9-iz74.json')
    .then(res => res.json())
    
        .then(data => {
            console.log(data);
            let locations = []
            
            for(let i = 0; i < data.length;i++){    

                if(!locations.includes(data[i].center)){
                    let location = data[i].zipcode

                        const li = document.createElement('li')
                        locations.push(data[i].center)
                        ul.append(li)
                        li.innerText = `${data[i].center} in ${data[i].city}, ${data[i].state}: `
                        
                        fetch(`http://api.weatherapi.com/v1/current.json?key=8e81c9a46e024020860200718212909&q=${location}`)
                        .then(res => res.json())
                        .then(data => {
                            const span = document.createElement('span')
                            li.append(span)
                            span.innerText = `${Math.round(data.current.temp_f)}F ${data.current.condition.text}`
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } 
            }
        })
        .catch(error =>{
            console.log(error);
        })
}
