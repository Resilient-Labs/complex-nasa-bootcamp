# 🚀 Project: Complex NASA API

### Goal: Use NASA's API to return all of their facility locations (~400). Display the name of the facility, its location, and the weather at the facility currently. 

<ol>
  <li>The HTML was so simple.  It was a lil'  classic &lt;button&gt;.  And a table with some text. That's it.  Wowza.</li>
  <li>The CSS was fun for me, as it usually is, honestly, only this time, it was a amtter of moments to add a couple of boxes with borders and flex them around each other.  The  blue border around everything coupled with the background is so... NASA, y'know?</li>
  <li>The JavaScript behavior, oh boy.  This was no small task at all.  It really took a village. My entire group sat and coded this together.  API's are no joke.</em></li>
  <li>In the JavaScript, I created an one-click arrow function (because you only need to click once so as to not fry the API.)  This gives a <em>biiig</em> task for a little button.</li>
  <li>The first fetch request grabs the facility name, control room, and location using the API from a variable named nasaFetch.  It then spits that out into the HTML.</li>
  <li>The second fetch request is made to the OpenWeather API. This uses the latitude and longitude data from the current NASA JSON object.</li>
  <li>Depending on the data fetched from the API, the function will return the temperature in Fahrenheit and Celsius as well as an emoji based on the temperature.</li>
  <li>Using template literals, I created a variable called displayData to create a new table row with cells that display the centerName, control, location, weatherDisplayF, weatherDisplayC, and emoji variables.</li>
  <li>The HTML will print a new table containing all the data gathered by both fetch requests.</li>
  <li>And that's it, done and dusted.</li>
</ol>

<p>Overall, this one is fantastic, honesty.  Another successful attempt at using API's.  This one was more complex than the other so it took <em>a lot.</em> This API project involved a good amount of roundabout methods, but it made sense after learning how to use the fetch data from one to the next.  I already know how to manipulate the HTML from JavaScript, so putting together info from a database and putting that in on the page as opposed to hard coding things is mad cool. ☝🏾</p>

<ul>
  <li>I completed the challenge: | 5 <em>It wasn't simple--but it's done.  And it works!</em></li>
  <li>I feel good about my code: | 5 <em>As stated prior, it was a challenge, but I learned a lot and the code looks neat enough for something this complex.</em></li>
</ul>
