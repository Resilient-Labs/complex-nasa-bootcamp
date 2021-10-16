# 🚀 Complex NASA API

As the user loads into the page, a chart of NASA facilities, their respective locations, and the current temperature (in Fahrenheit) at said location is displayed.

**Live Demo:** *Link to be created*

<img width="956" alt="Complex NASA API" src="https://user-images.githubusercontent.com/88993361/137065649-72513814-2e4b-456a-bef3-245ebbabf43b.png">

## How It's Made

The application is primarily created using JS and uses the integration of two different APIs in order to gather the information needed to complete the chart. To start off, the computer sends a request to the NASA Facility API and stores each facility name and its respective location in the JS. Then, the computer iterates through every location and inserts each one as a parameter in order to send another request to the Open Weather API, which retrieves the current temperature for each location. 

## What I Learned
Because this application is so API heavy it ephasized the importance of researching APIs to find the one best fit for not only the project but also each other, if using multiple APIs. For example, the NASA Facility API convienently stores the ZIP codes for each facility in their data, which is able to be entered in one of the parameters of the Open Weather API. Otherwise, say you used another weather API (which hypothetically only accepts longitude and latitiude as a parameter), you'd have to grab the location, convert it to longatitude and latitude, and then enter it into that weather API which is not efficient for the project we're doing.

