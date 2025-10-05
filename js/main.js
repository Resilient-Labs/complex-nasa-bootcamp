//Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently.


const url = `https://corsproxy.io/?https://data.nasa.gov/docs/legacy/gvk9-iz74.json`;

fetch(url)
    .then(res => res.json())
    .then(data => {
        document.querySelector('.title').innerText = `NASA's ${data.length} facilities`;
        const weatherKey = '2fbe05105a40ecae1a8bf456025269a0';

        data.forEach(facility => {
            const { h2, location, weather } = createCard();

            const lat = facility.location.latitude;
            const lon = facility.location.longitude;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${weatherKey}`;

            h2.innerText = facility.center;
            location.innerText = `${facility.city}, ${facility.state} ${facility.zipcode}, ${facility.country}`;
            fetch(weatherUrl)
                .then(res => res.json())
                .then(data => {
                    weather.innerText = `${data.main.temp}°F`;
                })
                .catch(error => console.log(error));

        });

    })
    .catch(error => console.log(error));


function createCard() {
    //Create a card
    const cards = document.querySelector('.cards');
    const div = document.createElement('div');
    div.className = 'card';
    //Create card's content
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    const h2 = document.createElement('h2');
    h2.className = 'center';
    const location = document.createElement('p');
    location.className = 'location';
    const weather = document.createElement('span');
    weather.className = 'weather';
    //Adding style
    div.classList.add('card');
    //Connect tags
    wrapper.append(h2, location);
    div.append(wrapper, weather);
    cards.append(div);
    //return tags as an {} to diconstruct
    return { h2, location, weather };
}
