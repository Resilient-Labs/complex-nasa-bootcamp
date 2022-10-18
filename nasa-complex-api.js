document.querySelector('button').addEventListener('click',wet)
const apikey = '2099b506b411c959dbbd4f65b09ff67a'
function wet(){
    fetch('http://data.nasa.gov/resource/gvk9-iz74.json')
    .then(res => res.json())
    .then ((data) => {
        for(let i = 0; i <400 ; i++){
            let lat = data[i].location.latitude
            let lon = data[i].location.logitude
            let facility = data[i].facility
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&untis=imperial')
            .then(res => res.json())
            .then((info) =>{
                console.log(info)
            let text = document.currentElement('p')
            text.innerText = 'it is ${info.main.temp} in ${facility}'
            document.querySelector(',location').appendChild(text)
            })
            
        }
    })
}