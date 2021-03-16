//Search elements declared and given values in variables
let input = $("#input");
let search = $(".btn");
let historyCities = $("#historyCities");
let pastCities = document.createElement("ul");
pastCities.setAttribute("class","past-cities list-unstyled");
let listCityItem = $(".list-city-item");

//Present weather tags declared and given values in variables
let present = $("#cityInfo");


// //Future weather tags declared and given values in variables
let futureDivs = $("#5Day");


//runs code when user types in a city and clicks the search button with their mouse
search.click(function() {



    let newCity = input.val();

    //If they have not searched a city yet the code will add their current city to local storage and then render it onto the webpage
    if (localStorage.getItem("cities") === null) {
        const newInput = [];
        newInput.push(newCity);
        localStorage.setItem("cities", JSON.stringify(newInput));
        const history = JSON.parse(localStorage.getItem("cities"));
        console.log(history);
        historyCities.append(pastCities); // ul 
        let listItems = "";
        for (let i = 0; i < history.length; i++) {
            listItems += "<li class='list-city-item border p-3'>"+history[i]+"</li>";
        };

        $(".past-cities").html(listItems);
        
        //calss the searchCity function
        searchCity(newCity);

    //if they have history of searched cities in their local storage code runs to add the new search and old to the website
    } else {

        let old = JSON.parse(localStorage.getItem("cities"));

    
        if ($.inArray(JSON.parse(JSON.stringify(newCity)), old) >= 0) {
            console.log("Search a new city");
            return;
        }
    
        old.push(newCity);

        localStorage.setItem("cities", JSON.stringify(old));

        listItems = "";
        for (let i = 0; i < old.length; i++) {
            listItems += "<li class='list-city-item border p-3'>"+old[i]+"</li>";
        };

        $(".past-cities").html(listItems);

        //calls the searchCity function
        searchCity(newCity);
    }
})

    //renders past history onto page as user opens or refreshes the page
    if (localStorage.getItem("cities") === null) {
        console.log("Local Storage Empty");
    } else {

        let pastCitiesHistory = JSON.parse(localStorage.getItem("cities"));

        console.log("*****",pastCitiesHistory);
        historyCities.append(pastCities); // ul 

        let listItems = "";
        for (let i = 0; i < pastCitiesHistory.length; i++) {
            listItems += "<li class='list-city-item border p-3'>"+pastCitiesHistory[i]+"</li>";
        };

        $(".past-cities").html(listItems);
    
    }


//fetches information needed for present city weather
function searchCity(word) {
    let requestCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + word + "&appid=217bed3cfe116291c85bc4819a64b5e0&units=imperial"

    fetch (requestCurrent)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        present.removeClass("d-none");
        
        //renders html elements and content onto website in place of original html elements and inserting path to information
        const currentDayMarkUp = 
        `
            <h4 id="cityName">
                <span>${data.name}</span>
                <span>(${moment().format("MM/DD/YYYY")})</span>
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
        
            </h4>
            <div id="temp" class="p-2">Temperature: ${data.main.temp} &#xb0;F</div>
            <div id="humidity" class="p-2">Humidity: ${data.main.humidity} %</div>
            <div id="windSpeed" class="p-2">Wind Speed: ${data.wind.speed} MPH</div>
            <div id="uv"></div>
        `;

        $("#cityInfo").html(currentDayMarkUp);

        //collects latitude and longitude data information for next fetch request
        let lat = data.coord.lat;
        let lon = data.coord.lon;

    //fetches information needed for the current city's uv index number
    let requestUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=217bed3cfe116291c85bc4819a64b5e0&units=imperial"

    fetch (requestUV)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        
        //renders html element by replacing old uv div and inserting path to information
        const currentUV =
        `
            <div id="uv" class="p-2">UV Index: <span id="number">${data.value}</span></div>
        `;

        $("#uv").replaceWith(currentUV);
        
        //Changes background color of uv index number according to how hazardous it is
        if (data.value < 3) {
            $("#number").css({"background-color":"#00FF00","border-radius":"5px","padding":"4px"});
        } else if (data.value >= 3 && data.value < 6) {
            $("#number").css({"background-color":"#FFFF00","border-radius":"5px","padding":"4px"});
        } else {
            $("#number").css({"background-color":"#FF0000","border-radius":"5px","padding":"4px"});
        }

    //fetches information needed for the future 5 day forecast of searched city
    let requestFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + word + "&cnt=5&appid=217bed3cfe116291c85bc4819a64b5e0&units=imperial"

    fetch(requestFive)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        futureDivs.removeClass("d-none");

        //renders html elements by replacing original html elements and inserting path to information
        const currentFive =
        `
        <div class="future col-12 col-sm-5 col-md-3 bg-primary rounded m-2 py-2 text-light">
            <h5 id="day1" class="fw-bold">${moment().add(1, "days").format("MM/DD/YYYY")}</h5>
            <div id="day1Icon"><img src="http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png"/></div>
            <div id="day1Temp">Temp: ${data.list[0].main.temp}&#xb0;F</div>
            <div id="day1Hum">Humidity: ${data.list[0].main.humidity}%</div>
        </div>
        <div class="future col-12 col-sm-5 col-md-3 bg-primary rounded m-2 py-2 text-light">
            <h5 id="day2">${moment().add(2, "days").format("MM/DD/YYYY")}</h5>
            <div id="day2Icon"><img src="http://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png"/></div>
            <div id="day2Temp">Temp: ${data.list[1].main.temp}&#xb0;F</div>
            <div id="day2Hum">Humidity: ${data.list[1].main.humidity}%</div>
        </div>
        <div class="future col-12 col-sm-5 col-md-3 bg-primary rounded m-2 py-2 text-light">
            <h5 id="day3">${moment().add(3, "days").format("MM/DD/YYYY")}</h5>
            <div id="day3Icon"><img src="http://openweathermap.org/img/w/${data.list[2].weather[0].icon}.png"/></div>
            <div id="day3Temp">Temp: ${data.list[2].main.temp}&#xb0;F</div>
            <div id="day3Hum">Humidity: ${data.list[2].main.humidity}%</div>
        </div>
        <div class="future col-12 col-sm-5 col-md-3 bg-primary rounded m-2 py-2 text-light">
            <h5 id="day4">${moment().add(4, "days").format("MM/DD/YYYY")}</h5>
            <div id="day4Icon"><img src="http://openweathermap.org/img/w/${data.list[3].weather[0].icon}.png"/></div>
            <div id="day4Temp">Temp: ${data.list[3].main.temp}&#xb0;F</div>
            <div id="day4Hum">Humidity: ${data.list[3].main.humidity}%</div>
        </div>
        <div class="future col-12 col-sm-5 col-md-3 bg-primary rounded m-2 py-2 text-light">
            <h5 id="day5">${moment().add(5, "days").format("MM/DD/YYYY")}</h5>
            <div id="day5Icon"><img src="http://openweathermap.org/img/w/${data.list[4].weather[0].icon}.png"/></div>
            <div id="day5Temp">Temp: ${data.list[4].main.temp}&#xb0;F</div>
            <div id="day5Hum">Humidity: ${data.list[4].main.humidity}%</div>
        </div>
        `;

        $("#futureWeather").html(currentFive);
    })
    
    //logs err if what they inserted into the input box does not work
    }).catch(function(err) {
        console.log(err);
    })

})
}

//runs searchCity function if a city in their history has been clicked
$(".past-cities").on("click", "li", function(name) {
    searchCity(name.target.firstChild.data);
})


