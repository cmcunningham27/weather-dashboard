# weather-dashboard

---

A weather application that allows users to check current and future weather for city of their choice, or look at weather for a city they searched in the past. You will find that the app will run in the browser and features dynamic HTML and CSS utilizing Bootstrap, Javascript, jQuery, and Moment.js.

&nbsp;

## Links

---

[Deployed Application URL]( https://cmcunningham27.github.io/weather-dashboard/)

[GitHub Repository URL](https://github.com/cmcunningham27/weather-dashboard)

&nbsp;

## The following image shows how the webpage appears on a desktop

---

[website screenshot](./assets/images/website.png)

&nbsp;

## About the Project

---

I needed to create a weather dashboard that allowed users to see the current and next 5 days' weather for a specific city. To do this I needed to have an input field where the user could type a city name. Once they click the search button 3 fetch requests, from a weather API, gather needed information to render onto the website. The first request gathers the current weather (in imperial units): current date (using Moment.js), weather icon, temp, humidity, and wind speed. The second request gathers the current weather's UV index by inputing the lon and lat from the first request, and changes the background color of the number collected according to whether the conditions are favorable (green), moderate (yellow), or severe (red). The third request gathers the future 5 day forecasts': date (using Moment.js), weather icon for each day, temp, and humidity

&nbsp;

Each time the user searches a city, that city is stored in their local storage, and collected to create a history list. I then gave each of the history cities the on() method to ensure that when the user clicks on a listed city, they will be provided that city's current and future 5 day forecast. If the user types in a city they had already searched previously, they will be told to search a new city name. 

&nbsp;

## Complications I Came Across

---

I ran into a problem when I wanted to change HTML elements after a city had been searched. I received help that showed me a more simple approach by typing in actual HTML tags and their content, and then appending it to the parent element. This I had never seen before, but came in very handy when I needed to replace original elements with new, updated elements.

&nbsp;

When I deleted my local storage I had found that after all my changes and updates I no longer had the initial city stored in local storage. It took some time and trail-and-error on my part, but I finally figured out how to get it stored when the local storage was empty. After that I had to figure out how to have it rendered onto the website in it's parent element, instead of waiting till the user searches a second city. 

&nbsp;

Another issue I came across was figuring out how to change the background color of just the UV index number. When I received help, it became known that I had actually been on the right track, just forgot a closing quotation mark. After everything was finished and just about ready to be turned in the day it was due, I wound up with an error I haven't seen yet. 

&nbsp;

## How the User Can Use the Website

---

When the user opens the page they will see a search box and button. The text tells them to search for a city. They will type in a city name and click the search button with their mouse. Once they do this they will be shown the name of the city they searched, and the current and future 5-day forecast for their searched city. If they wish to search another city, they can go back to the search box and type a new city name. When they have searched a few cities and created a list of history, they can click on a city they have already searched by clicking on its name below the search box.


&nbsp;


## Credits

---

Cassandra Cunningham, https://github.com/cmcunningham27