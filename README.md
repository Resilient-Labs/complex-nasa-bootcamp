# 🚀 Project: Complex NASA API
Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently. 


https://github.com/user-attachments/assets/ed735012-d1d7-49f1-b5a7-40f939434b02

## How It's Made:
List of NASA Facility locations are dynamically populated into the dropdown by fetching data from the NASA API.
Click on any location and the current condition, temperature, winds, and humidity are provided from a weather API by submitting the location of the NASA facility.

## What I Learned
- How to dynamically populate dropdown options as well as select them
- Use constructors to ensure that all data follows the same format and provides necessary information
- Succesfully create event listeners for all list options using forEach and event bubbling

**If you would like to download and test this code:**
- Get a key from https://www.weatherapi.com
- Create a key.js document in the js folder
```
export const key = 'your key here'
```
