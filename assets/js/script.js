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
let futureDivs = $(".future");
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

    const history = JSON.parse(localStorage.getItem("cities"));

    if ($.inArray(JSON.parse(JSON.stringify(newCity)), history) >= 0) {
        console.log("Search a new city");
        return;
        
    } else {
        history.push(newCity);

        localStorage.setItem("cities", JSON.stringify(history));

        let listItems = "";
        for (let i = 0; i < history.length; i++) {
            listItems += "<li class='list-city-item'>"+history[i]+"</li>";
        };

        $(".past-cities").html(listItems);

        searchCity(newCity);
    }
})

    let pastCitiesHistory = JSON.parse(localStorage.getItem("cities"));

    console.log("*****",pastCitiesHistory);
    history.append(pastCities); // ul 

    let listItems = "";
    for (let i = 0; i < pastCitiesHistory.length; i++) {
        listItems += "<li class='list-city-item'>"+pastCitiesHistory[i]+"</li>";
    };

    $(".past-cities").html(listItems);


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
            <h2 id="cityName">
                <span>${data.name}</span>
                <span>${moment().subtract(10, "days").calendar()}</span>
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
        
            </h2>
            <div id="temp">Temperature: ${data.main.temp} &#xb0;F</div>
            <div id="humidity">Humidity: ${data.main.humidity} %</div>
            <div id="windSpeed">Wind Speed: ${data.wind.speed} MPH</div>
            <div id="uv">UV Index: </div>
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
        `
        $("#uv").html(currentUV);
    
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