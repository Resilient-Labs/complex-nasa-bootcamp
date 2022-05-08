const anibutton = document.getElementById('btn')
let button = anibutton

button.addEventListener('click', function(){
    const animeinput = document.querySelector('.animeInput')
fetch('https://api.jikan.moe/v4/anime?q='+animeinput.value+'&type='+animeinput.value+'%20')
.then(res => res.json())
.then(res => {

    //input elements

    //display elements
    const atitle = document.querySelector('.title') 
    const jtitle = document.querySelector('.jTitle')
    const stu = document.querySelector('.studios')
    const animage = document.querySelector('.aniImage')
    //const trail = document.querySelector('.aniTrailer')
    const syn = document.querySelector('.synopsis')
    const gen = document.querySelector('.genre')
    const seas = document.querySelector('.season') 
    const epi = document.querySelector('.episodes') 
    const air = document.querySelector('.aired') 
    const rate = document.querySelector('.rating') 
    const anitype = document.querySelector('.type') 
    
    //parsed objects
    let titleValue = res.data[0].title
    let jtitleValue = res.data[0].title_japanese
    let animeTypeValue = res.data[0].type
    let animegenreValue = res.data[0].genres[0].name
    let airedValue = res.data[0].aired.from
    let seasonValue = res.data[0].season
    let episodesValue = res.data[0].episodes
    let ratingValue = res.data[0].rating
    let synopsisValue = res.data[0].synopsis
    let studioValue = res.data[0].studios[0].name
    let imageValue = res.data[0].images.jpg.image_url
    //let anitrailer = res.data[0].trailer.url
       
    //add values from object literals to innerhtml/text
    atitle.innerText += titleValue
    jtitle.innerHTML += jtitleValue
    stu.innerHTML += studioValue
    anitype.innerHTML += animeTypeValue
    gen.innerHTML += animegenreValue
    air.innerHTML += airedValue
    seas.innerHTML += seasonValue
    epi.innerHTML += episodesValue
    rate.innerHTML += ratingValue
    syn.innerHTML += synopsisValue
    animage.innerHTML += `<img src="${imageValue}">`
    //trail.innerHTML += `<video src="${anitrailer}">`

    //console stuff happening
    console.log(res)
    console.log(atitle)
    console.log(titleValue)
    })
})



var myHeaders = new Headers();
myHeaders.append("Authorization", "Client-ID be0aa938b8cef54");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

button.addEventListener('click', function () {
    const animeinput = document.querySelector('.animeInput')
    fetch("https://api.imgur.com/3/gallery/search/{{sort}}/{{window}}/{{page}}?q="+animeinput.value+'&q_type=anigif', requestOptions)
    .then(res => res.json())
    .then(res => {
        let meme = document.querySelector('.meme')
        let imgur = res.data[0].images[0].link

        meme.innerHTML += `<img src="${imgur}">`

    console.log(res)
    })
    .catch(error => console.log('erorr', error))
})
