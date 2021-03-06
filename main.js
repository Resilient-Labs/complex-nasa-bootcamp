document.querySelector("button").addEventListener('click',()=>{
	fetch(`https://data.nasa.gov/resource/gvk9-iz74.json`)
	.then(res => res.json())
	.then(response =>{
		// console.log(data)
		response.forEach((obj)=>{
			// console.log(response)
			let city=obj.city
			let facility=obj.center
			let country=obj.country
			let latitude=obj.location.latitude
			let longitude=obj.location.longitude
			 const ol = document.querySelector('ol')
			 const li = document.createElement('li')
			 fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=b63e2f9db34e2b9c2332cb18f8b3509c`)
			 .then(res=>res.json())
			 .then(data =>{
				//  console.log(data)
				 let location = data.name
				 let weather = data.weather[0].main
				 li.innerHTML = li.innerHTML + facility + " is  in " +  city + " with a current temp of " +  data.main.temp 
				 ol.appendChild(li) 
				 document.querySelector("p").innerText = facility
			 })
			 .catch(err=>{
				console.log("error" + err)
			  })
			  .catch(err=>{
				console.log("error" + err)
			  })
		})
	})
})