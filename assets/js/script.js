//Search tabs declared in variables
let input = $("#input");
let search = $(".btn");
let history = $("#history");
let pastCities = document.createElement("ul");
pastCities.setAttribute("class","past-cities list-unstyled");
//let pastCity = document.createElement("li");
//Present weather tabs declared in variables
let present = $("#city");
let cityName = $("#cityName");
let currentDay = $("#currentDay");
let cityIcon = $("#cityIcon");
let temp = $("#temp");
let humidity = $("#humidity");
let windSpeed = $("#windSpeed");
let lat;
let lon;
let uv = $("#uv");

//Future weather tabs declared in variables
let futureDivs = $("#5Day");
let day1 = $("#day1");
let day2 = $("#day2");
let day3 = $("#day3");
let day4 = $("#day4");
let day5 = $("#day5");
let day1Icon = $("#day1Icon");
let day2Icon = $("#day2Icon");
let day3Icon = $("#day3Icon");
let day4Icon = $("#day4Icon");
let day5Icon = $("#day5Icon");
let day1Temp = $("#day1Temp");
let day2Temp = $("#day2Temp");
let day3Temp = $("#day3Temp");
let day4Temp = $("#day4Temp");
let day5Temp = $("#day5Temp");
let day1Hum = $("#day1Hum");
let day2Hum = $("#day2Hum");
let day3Hum = $("#day3Hum");
let day4Hum = $("#day4Hum");
let day5Hum = $("#day5Hum");
//let cities = [];
    
// cities.push(localStorage.getItem("cities", cities));
// console.log(cities);

search.click(function() {

    let newCity = input.val();

    if (localStorage.getItem("cities") === null) {
        const newInput = [];
        newInput.push(newCity);
        localStorage.setItem("cities", JSON.stringify(newInput));
        const history = JSON.parse(localStorage.getItem("cities"));
        console.log(history);
        let listItems = "";
        for (let i = 0; i < history.length; i++) {
            listItems += "<li class='list-city-item border'>"+history[i]+"</li>";
        };

        $(".past-cities").html(listItems);

        searchCity(newCity);
    } else {

    history = JSON.parse(localStorage.getItem("cities"));

    
    if ($.inArray(JSON.parse(JSON.stringify(newCity)), history) >= 0) {
        console.log("Search a new city");
        return;
    }
    
    history.push(newCity);

    localStorage.setItem("cities", JSON.stringify(history));

    listItems = "";
    for (let i = 0; i < history.length; i++) {
        listItems += "<li class='list-city-item border p-3'>"+history[i]+"</li>";
    };

    $(".past-cities").html(listItems);

    searchCity(newCity);
    }
})
    if (localStorage.getItem("cities") === null) {
        console.log("Local Storage Empty");
    } else {

        let pastCitiesHistory = JSON.parse(localStorage.getItem("cities"));

        console.log("*****",pastCitiesHistory);
        history.append(pastCities); // ul 

        let listItems = "";
        for (let i = 0; i < pastCitiesHistory.length; i++) {
            listItems += "<li class='list-city-item border p-3'>"+pastCitiesHistory[i]+"</li>";
        };

        $(".past-cities").html(listItems);
    
    }


//fetches information needed for present city weather
function searchCity() {
    let requestCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + input.val() + "&appid=217bed3cfe116291c85bc4819a64b5e0&units=imperial"

    fetch (requestCurrent)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        present.removeClass("d-none");
        
        
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
            <div id="uv" class="p-2">UV Index: </div>
        `;

        $("#cityInfo").html(currentDayMarkUp);
        let lat = data.coord.lat;
        let lon = data.coord.lon;


    let requestUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=217bed3cfe116291c85bc4819a64b5e0&units=imperial"

    fetch (requestUV)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        
        const currentUV =
        `
            <div id="uv">UV Index: ${data.value}</div>
        `;

        $("#uv").html(currentUV);


    let requestFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + input.val() + "&cnt=5&appid=217bed3cfe116291c85bc4819a64b5e0&units=imperial"

    fetch(requestFive)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        futureDivs.removeClass("d-none");

        const currentFive =
        `
        <div class="future col-2.5 bg-primary rounded mx-1 text-light">
        <h5 id="day1" class="fw-bold">${moment().add(1, "days").format("MM/DD/YYYY")}</h5>
        <div id="day1Icon">${data.list[0].weather[0].icon}.png</div>
        <div id="day1Temp">Temp: ${data.list[0].main.temp}&#xb0;</div>
        <div id="day1Hum">${data.list[0].main.humidity}</div>
    </div>
    <div class="future col-2 bg-primary rounded mx-1 text-light">
        <h5 id="day2">${moment().add(2, "days").format("MM/DD/YYYY")}</h5>
        <div id="day2Icon">${data.list[0].weather[0].icon}.png</div>
        <h6 id="day2Temp"></h6>
        <h6 id="day2Hum"></h6>
    </div>
    <div class="future col-2.5 bg-primary rounded mx-1 text-light">
        <h5 id="day3">${moment().add(3, "days").calendar()}</h5>
        <div id="day3Icon"></div>
        <h6 id="day3Temp"></h6>
        <h6 id="day3Hum"></h6>
    </div>
    <div class="future col-2 bg-primary rounded mx-1 text-light">
        <h5 id="day4">${moment().add(4, "days").calendar()}</h5>
        <div id="day4Icon"></div>
        <h6 id="day4Temp"></h6>
        <h6 id="day4Hum"></h6>
    </div>
    <div class="future col-2 bg-primary rounded mx-1 text-light">
        <h5 id="day5">${moment().add(5, "days").calendar()}</h5>
        <div id="day5Icon"></div>
        <h6 id="day5Temp"></h6>
        <h6 id="day5Hum"></h6>
    </div>
        `
        $("#futureWeather").html(currentFive);
    })
    
        // let requestFive = "https://api.openweathermap.org/data/forecast?"
    }).catch(function(err) {
        console.log(err);
    })

    
        
//         // const currentDayMarkUp = 
//         // `
//         //     <div id="uv">UV Index: ${data.</div>
//         // `;

//         // $("#cityInfo").html(currentDayMarkUp);    
})
}