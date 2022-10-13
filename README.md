# 🚀 Project: Complex NASA API

### Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently. 

![nasa](https://user-images.githubusercontent.com/91163017/195708370-19b06a85-a7c4-450a-8d83-5424adbb81fa.gif)

<img width="800" alt="Screen Shot 2022-10-13 at 4 54 43 PM" src="https://user-images.githubusercontent.com/91163017/195708729-0e2b4445-6c36-4008-b000-ccd98fb536ab.png">

<img width="800" alt="Screen Shot 2022-10-13 at 4 55 23 PM" src="https://user-images.githubusercontent.com/91163017/195708753-d1194234-398a-4096-87bd-6553f21bf331.png">

## How It's Made:

**Tech used:** HTML, CSS, JavaScript and fetch web API

When the get facilities button is pressed, a request is sent to the NASA api which returns an array with over 400 objects inside. A few properties are saved and displayed into the DOM. A second request is made to the openweathermap api that returns the weather for a specific location.

## Lessons Learned:

You can have multiple fetch request that work together. In this project, the NASA api gave me longitude and latitude coordinates which I then used when making the request to the openweathermap api.

## Disclamer:

If you clone this project, you need to use your own API key from https://openweathermap.org/api
NASA api - https://data.nasa.gov/resource/gvk9-iz74.json

