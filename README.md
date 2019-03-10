# 🚀 Week07 Bootcamp2019a Project: Complex NASA API

On the click of a button, this app will list all the NASA facilities, their location and the current weather.

## How It's Made:

**Tech Used:** HTML, JS, open weather map api, nasa facility api

I created an event listener for the button to run my function which contains all the fun stuff to ultimately display the facilities, city and country and the weather. Within the function, I fetched the nasa facility api, pulled the json file from the api, and iterated through the array within the json file in order to get the center name and location for each facility object from the json. After putting the data I needed from the nasa facility api into variables, I fetched the weather api, passed through latitude and longitude to find the temperature for that location--which was the location for each facility. I also had to convert the temperature to farenheit because it was originally in kelvin. At the end, I displayed everything into the dom with a miniature template.


## Lessons Learned:

I learned that fetch calls return promises, so having a function call within a .then() and trying to return a value from the function call won't work. Also learned that I can create another fetch call within one fetch call and still utilize the information from both fetches.
