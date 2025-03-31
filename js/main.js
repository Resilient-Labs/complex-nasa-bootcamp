//
const nasaLocationsBtn = document.querySelector('#nasaLocationsBtn');

nasaLocationsBtn.addEventListener('click', getLocations);

function getLocations(){
    //nUrl = nasaUrl, wUrl = weather url
    let nUrl = `https://data.nasa.gov/resource/gvk9-iz74.json`;

    fetch(nUrl)
        .then(nRes => {
            if(!nRes.ok){
                throw Error('The attempt to return the response was unsuccessful');
            }
            return nRes.json();
        })
        .then(nData => {
            console.log(nData);

            let ul = document.querySelector('ul');
            for(let i = 0; i < nData.length; i++){
                let nasaSites = nData[i];
                let lat = nasaSites.location.latitude;
                let lon = nasaSites.location.longitude
                let units = 'imperial';
                let apiKey = 'cd3aa30d6177ff5fbd69c4ba5c1f1d54';
                let wUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
                
                fetch(wUrl)
                    .then(wRes => {
                        if(!wRes.ok){
                            throw Error('The attempt to return the response was unsuccessful');
                        }
                        return wRes.json();
                    })
                    .then(wData => {
                        console.log(wData);
                        // console.log(`Weather for ${nasaSites.facility}`, wData.main.temp);

                        let li = document.createElement('li');

                        li.innerHTML = `Facility: ${nasaSites.facility} - Location: ${nasaSites.city}, ${nasaSites.state} - Temperature:${wData.main.temp}F`;
            
                        ul.appendChild(li);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
        .catch(err => {
            console.log(err);
        })
}
