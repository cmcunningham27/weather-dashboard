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
    
    //cities.push(newCity);
    //console.log(cities);

    const history = JSON.parse(localStorage.getItem("cities"));

    history.push(newCity);

    localStorage.setItem("cities", JSON.stringify(history));

    let listItems = "";
    for (let i = 0; i < history.length; i++) {
        listItems += "<li class='list-city-item'>"+history[i]+"</li>";
    };

    $(".past-cities").html(listItems);

    searchCity();
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
    let requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input.val() + "&appid=217bed3cfe116291c85bc4819a64b5e0&units=imperial"

    fetch (requestURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        present.removeClass("d-none");
        // for (var i = 0; i < data.length; i++) {
        //     cityName.texContent = data[i].name;
        //     currentDay.textcontent = moment().subtract(10, "days").calendar();
        //     cityIcon.textContent = data[i].weather.icon;
        //     temp.textContent = data[i].main.temp;
        //     humidity.textContent = data[i].main.humidity;
        //     windSpeed.textContent = data[i].wind.speed;
        // }

        // </span>
        //         <span id="currentDay"><span id="cityIcon"></span></span>

        const currentDayMarkUp = 
        `
            <h2 id="cityName">
                <span>${data.name}</span>
                <span>${Date.now}</span>
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
                
            </h2>
            <div id="temp">${data.main.temp} F</div>
            <div id="humidity">${data.main.humidity} %</div>
            <div id="windSpeed">${data.wind.speed}</div>
            <div id="uv"></div>
        `;

        $("#cityInfo").html();

    }).catch(function(err) {
        console.log(err);
    })
}

// //Adds event listener for when the user searches a city
//search.on("click", searchCity);