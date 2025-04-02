document.querySelector('button').addEventListener('click', getNasaDate)

function getNasaDate(){

    document.querySelector('iframe').src = ''
    document.querySelector('img').src = ''

    const nasaDate = document.querySelector('input').value

    fetch(`https://api.nasa.gov/planetary/apod?api_key=5zjGk9dwqh6KrWSRQCqbV0RIct5n3OJKMqG0lhNn&date=${nasaDate}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        //display our data
        document.querySelector('h2').innerText = data.title
        // document.querySelector('img').src = data.hdurl
        document.querySelector('h3').innerText = data.explanation
        if(data.media_type === 'image'){   //media_type is a property key of data (our JSON) and 'image' is its defined property value (check console)
            document.querySelector('img').src = data.hdurl
        }else{
            document.querySelector('iframe').src = data.hdurl
        }

        // Extract a topic to search on Wikipedia ---> can't figure it out so Astronomy will do
        const topic = 'Astronomy'    //data.query.search[0].title

        //data.title.trim() || data.explanation.split(' ').slice(0, 5).join(' ') || 'Astronomy'// First 5 words from the explanation
        //.split(' ')[0]; // Example: Use the first word of the title as the topic
        getWikipediaData(topic);
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}

function getWikipediaData(query) {
    // Fetch data from Wikipedia API
    const wikipediaUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    
    //`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query.trim())}&format=json&origin=*`;

    fetch(wikipediaUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // Display Wikipedia data
            const section = document.querySelector('#summary');
            section.innerHTML = ''
            const wikiInfo = document.createElement('p');
            wikiInfo.innerHTML = `
                <strong>Wikipedia Summary:</strong><br>
                <strong>Title:</strong> ${data.title}<br>
                <strong>Description:</strong> ${data.extract}<br>
                <a href="${data.content_urls.desktop.page}" target="_blank">Read more on Wikipedia</a>
            `;
            section.appendChild(wikiInfo);
        })
        .catch(err => {
            console.error(`error ${err}`);
        });
}
