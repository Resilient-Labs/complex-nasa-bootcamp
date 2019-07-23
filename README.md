# 🚀 Project: Complex NASA API

The project is webpage that uses an two apis to retrieve from Nasa all of the space station location (~400), and take the lcoation data from the first api, and use it as a parameter for a second weather API to find the weather at each of these locations.

<img src="/complexnasaapi.png?raw=true" alt="screenshot of complex Nasa API" height="200px">

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

The project was create and designed with HTML and CSS. Javascript was used to fetch an API that generates nasa location and a second api that generates weather.

## Optimizations (Optional):

Optional.


## Lessons Learned:

The major issue with this project was the asynchronous behavior in javascript and resolving that behavior so that the promises used to deliver information to the browser most quickly are actually fulfilled.  Additional lessons was the importance of limited the amount of data utilized when testing an API, particularly if there is a limit to the amount of data that can be pulled using any one key. Understanding what data is included in each pull, and which request result in multiple pulls will be useful to understand. Additionally CORS is also an issue that might be encountered when using an API. I was able to overcome this using a proxy for one of the weather APIs, but ultimately decided to use a different API that did not require the proxy. There were many lessons learned and questions raised about APIs during this particular project.
