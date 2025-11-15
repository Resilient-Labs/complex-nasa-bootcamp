# 🚀 Project: Complex NASA API

### Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently. 

### How to submit your code for review:

- Fork and clone this repo
- Create a new branch called answer
- Checkout answer branch
- Push to your fork
- Issue a pull request
- Your pull request description should contain the following:
  - (1 to 5 no 3) I completed the challenge
  - (1 to 5 no 3) I feel good about my code
  - Anything specific on which you want feedback!

Example:

I completed the challenge: 5
I feel good about my code: 4
I'm not sure if my constructors are setup cleanly...


Nasa into weather API

This api grabs all the nasa facilities and their location, and feeds that info into a weather api.

Tech used: HTML, CSS, JavaScript, Framework of choice

On page load, a fetch request instantly runs. The URL I used for my fetch request required that I have a cors proxy website in front of it. The api would otherwise run into a cors error. The fetch runs and grabs the list of over 400 nasa facilities. I setup a forEach loop to loop through the large array, and from each of the objects grab the facility name, latitude and longitude. I then setup another fetch request with the open weather api that takes in the latitude and longitude and returns the temperature. Then i put the temperature, facility name, and coordinates into the dom.



Optimizations

I would make it stylized for sure. I would consider adding some features to make the first nasa api project intrgrate with this one.

Lessons Learned:

i learned that proxy urls can work but this one was also very slow. I learned how to use the async await syntax properly but still opted not to use it in this case.
