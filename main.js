   document.querySelector('button').addEventListener('click', LookUp)

      function LookUp(){
      const inputVal = document.querySelector('input').value
      const url =``
      // const url =`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${inputVal}`
      

      fetch(url)
      .then(res => res.json())
      .then((data) => {
         console.log(data)
         if(data.media_type === 'img'){
            document.querySelector('img').src = data.hdurl
            document.querySelector('ifame').style.display = 'none'
      }
      else if(data.media_type === 'video'){

         document.querySelector('ifame').src=data.url
         document.querySelector('img').style.display = 'none'
      }
      document.querySelector('h2').textContent=data.title

      document.querySelector('h3').textContent=data.explanation
      })
}


