document.querySelector('button').addEventListener('click', getPicture )

function getPicture(){
  document.querySelector('img').src = ''
  document.querySelector('iframe').src = ''
  const inputDate = document.querySelector('input').value

  fetch(`https://api.nasa.gov/planetary/apod?api_key=J0pEl9p2AhYfjG99tngffnZAK03csWvapgtrAPC9&date=${inputDate}`) 
    .then(res => res.json()) // parse response as JSON 
    .then(data => { 
      console.log(data) 
      document.querySelector('h2').innerText = data.title
      document.querySelector('h3').innerText = data.explanation
      if(data.media_type === 'image'){
        document.querySelector('img').src = data.hdurl
      }else{
        document.querySelector('iframe').src = data.url
      }
     let url = data.url
      fetch(`http://api.pdflayer.com/api/convert?access_key=f821f1ce62c7125e7fefa1d150c9a4c2&document_url=${url}`)
 // parse response as JSON 
    .then(data => { 
        console.log(data)
        document.querySelector('a').innerHTML = data.url //tried to link url to href inseide of <a> tag
    }) 
    .catch(err => { 
        console.log(`error ${err}`) 
    })
    })}