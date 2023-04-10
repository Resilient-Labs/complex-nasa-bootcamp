document.querySelector('button').addEventListener('click', function () {
    getCenter();
    getWeather();
});

const list = document.getElementById('nasaCenters');
let nasaCenters = {
    ames: [],
    arm: [],
    glenn: [],
    god: [],
    godd: [],
    kat: [],
    jet: [],
    john: [],
    ken: [],
    lan: [],
    mars: [],
    mary: [],
    mich: [],
    nasa: [],
    neil: [],
    sten: [],
    wall: [],
    white: []
}

function getCenter() {
    const url = `https://data.nasa.gov/resource/gvk9-iz74.json`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (const fac of data) {
                if (fac.center === 'Ames Research Center') {
                    nasaCenters.ames.push(fac)
                }
                if (fac.center === 'Armstrong Flight Research Center') {
                    nasaCenters.arm.push(fac)
                }
                if (fac.center === 'Glenn Research Center') {
                    nasaCenters.glenn.push(fac)
                }
                if (fac.center === 'Goddard Space Flight Center') {
                    nasaCenters.god.push(fac)
                }
                if (fac.center === 'Goddard Institute of Space Studies') {
                    nasaCenters.godd.push(fac)
                }
                if (fac.center === 'Katherine Johnson IV and V Facility') {
                    nasaCenters.kat.push(fac)
                }
                if (fac.center === 'Jet Propulsion Laboratory') {
                    nasaCenters.jet.push(fac)
                }
                if (fac.center === 'Johnson Space Center') {
                    nasaCenters.john.push(fac)
                }
                if (fac.center === 'Kennedy Space Center') {
                    nasaCenters.ken.push(fac)
                }
                if (fac.center === 'Langley Research Center') {
                    nasaCenters.lan.push(fac)
                }
                if (fac.center === 'Marshall Space Flight Center') {
                    nasaCenters.mars.push(fac)
                }
                if (fac.center === 'Mary W. Jackson NASA Headquarters') {
                    nasaCenters.mary.push(fac)
                }
                if (fac.center === 'Michoud Assembly Facility') {
                    nasaCenters.mich.push(fac)
                }
                if (fac.center === 'NASA') {
                    nasaCenters.nasa.push(fac)
                }
                if (fac.center === 'Neil A. Armstrong Test Facility') {
                    nasaCenters.neil.push(fac)
                }
                if (fac.center === 'Stennis Space Center') {
                    nasaCenters.sten.push(fac)
                }
                if (fac.center === 'Wallops Flight Facility') {
                    nasaCenters.wall.push(fac)
                }
                if (fac.center === 'White Sands Test Facility') {
                    nasaCenters.white.push(fac)
                }
            }
            revailFacilities()
        });
}
function revailFacilities() {
    let select = document.querySelector('select').value
    let center = nasaCenters[select]
    list.innerHTML = ''
    let uniqueFacilities = new Set();
    for (let fac of center) {
        if (!uniqueFacilities.has(fac.facility)) {
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(`${fac.facility}`))
            list.appendChild(li)
            uniqueFacilities.add(fac.facility)
        }
    }
}

function getWeather() {
    let selection = document.querySelector('select').value
    let center = nasaCenters[selection];

    if (!center) {
        console.error(`Invalid selection: ${selection}`);
        return;
    }
    let location = `${nasaCenters[selection][0].location.coordinates[1]},${nasaCenters[selection][0].location.coordinates[0]}`;
    console.log(nasaCenters[selection][0].facility)
    const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8ff875d99eacc16b6055ea4f85ef5bb5&units=imperial`;

    fetch(url2)
        .then(res => res.json())
        .then(data2 => {
            document.querySelector('h2').innerText = data2.main.temp
            const li = document.createElement('li')
            li.appendChild(document.createTextNode(`Temperature: ${data2.main.temp}`));
            list.appendChild(li)


        })





        .catch(err => {
            console.log(`error ${err}`)
        });


}



