# Project: Complex NASA API

### Goal: Use NASA's API to return all of their facility locations. Display the name of the facility, its location, and the weather at the facility currently. 

# My Awesome Project

This project is an application that taps into NASA's API to fetch and display details of all their facility locations, which is roughly around 485. Alongside the facility names, the application also presents their locations and the current weather at those locations. A combination of HTML, CSS, and JavaScript makes this application responsive.

![Screenshot of the NASA Facility Locator App] (<img/complex nasa.png>)

## How It's Made:

### Tech used: 
- **HTML**: Structured the content and data presentation.
- **CSS**: Styled and enhanced the user interface to be intuitive.
- **JavaScript**: Integrated the NASA API, fetched the data, and dynamically populated the facility details on the webpage.

Building this application was an intricate process of making several API calls to fetch data from NASA's extensive database. Initially, the application makes a request to get a list of all the facilities. Once that data is received, asynchronous operations are performed for each facility to fetch the current weather details based on the location coordinates. The results are then rendered to the user in a neat, tabulated format.

## Optimizations:

The initial implementation involved fetching weather data for each facility sequentially, which was time-consuming. An optimization was made to perform these fetch operations in parallel, significantly reducing the data retrieval time.

## Lessons Learned:

- **Efficient API Calls**: Handling multiple API calls efficiently was crucial. 
- **Caching**: Realizing the importance of caching for assets, especially when dealing with applications that have a lot of repetitive content.
- **Continuous Learning**: This project reaffirmed the belief that every project, irrespective of its size or complexity, always offers a learning opportunity. The key is to be observant, receptive, and adaptable.



