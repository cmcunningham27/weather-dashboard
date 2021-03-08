//Search tabs declared in variables
let input = $("input");
let search = $(".btn");
let history = $("#history");

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
let cities = [];
    
// cities.push(localStorage.getItem("cities", cities));
// console.log(cities);

search.click(function() {
    let newCity = $("#input").val();
    
    cities.push(newCity);
    console.log(cities);
    localStorage.setItem("cities", JSON.stringify(cities));
    history.createElement("ul");
})
//fetches information needed for present city weather
function searchCity() {
    let requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid=217bed3cfe116291c85bc4819a64b5e0"

    fetch (requestURL, {
        units: "imperial"
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        present.addClass("col-12 col-md-8");
        for (var i = 0; i < data.length; i++) {
            cityName.texContent = data[i].name;
            currentDay.textcontent = moment().subtract(10, "days").calendar();
            cityIcon.textContent = data[i].weather.icon;
            temp.textContent = data[i].main.temp;
            humidity.textContent = data[i].main.humidity;
            windSpeed.textContent = data[i].wind.speed;
        }
    }).catch(function(err) {
        console.log(err);
    })
}

// //Adds event listener for when the user searches a city
search.on("click", searchCity(input.value));