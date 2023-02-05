var userContainer = document.getElementById('userHistory');
var userLat
var userLon

//Gets latitude and longitude of searched city
function getCoords () {

    //Resets weather container before adding new data
    var weatherContainer = $('#weatherContainer');
    weatherContainer.text("");
    //Gets user input from search and making api call based on search
    var userInput = document.getElementById('userInput').value;
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=6605e894b2d120e2bc470b6d7f80fe1b'

    //Gets the latitude and longitude of 1st result of search
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        userLat = data[0].lat;
        userLon = data[0].lon;
        getWeather();
    });

    //Gets and adds to search history from local storage
    var searchHistory = JSON.parse(localStorage.getItem("History")) || [];
    searchHistory.push(userInput);
    localStorage.setItem("History", JSON.stringify(searchHistory));

    //Creates button for each search history item
    var listItem = document.createElement('button');
    listItem.textContent = userInput;
    userContainer.append(listItem);
    listItem.classList.add('btn-primary')
}

//Gets weather data with latitude and longitude of searched location
function getWeather () {
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + userLat + '&lon=' + userLon + '&appid=6605e894b2d120e2bc470b6d7f80fe1b&units=imperial'
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        //Adding weayjer data to weather container
        var weatherContainer = $('#weatherContainer');
        var currentCity = $('<h2>');
        var currentTemp = $('<p>');
        var currentWind = $('<p>');
        var currentHumidity = $('<p>');
        console.log(data);
        //City Name
        currentCity.text(data.city.name);
        weatherContainer.append(currentCity);
        //Temperature
        currentTemp.text("Current Temp: " + data.list[0].main.temp + "°");
        weatherContainer.append(currentTemp);
        //Wind Speed
        currentWind.text("Wind Speed: " + data.list[0].wind.speed + "MPH");
        weatherContainer.append(currentWind);
        //Humidity
        currentHumidity.text("Humidity: " + data.list[0].main.humidity + "%");
        weatherContainer.append(currentHumidity);

        var day1 = $('#day1');
        var day1Temp = $('<p>');
        var day1Wind = $('<p>');
        var day1Humid = $('<p>');
        day1Temp.text("Temp: " + data.list[1].main.temp + "°");
        day1.append(day1Temp);
        day1Wind.text("Wind: " + data.list[1].wind.speed + "MPH")
        day1.append(day1Wind);
        day1Humid.text("Humidity: " + data.list[1].main.humidity + "%");
        day1.append(day1Humid);

        var day2 = $('#day2');
        var day2Temp = $('<p>');
        var day2Wind = $('<p>');
        var day2Humid = $('<p>');
        day2Temp.text("Temp: " + data.list[2].main.temp + "°");
        day2.append(day2Temp);
        day2Wind.text("Wind: " + data.list[2].wind.speed + "MPH")
        day2.append(day2Wind);
        day2Humid.text("Humidity: " + data.list[2].main.humidity + "%");
        day2.append(day2Humid);

        var day3 = $('#day3');
        var day3Temp = $('<p>');
        var day3Wind = $('<p>');
        var day3Humid = $('<p>');
        day3Temp.text("Temp: " + data.list[3].main.temp + "°");
        day3.append(day3Temp);
        day3Wind.text("Wind: " + data.list[3].wind.speed + "MPH")
        day3.append(day3Wind);
        day3Humid.text("Humidity: " + data.list[3].main.humidity + "%");
        day3.append(day3Humid);

        var day4 = $('#day4');
        var day4Temp = $('<p>');
        var day4Wind = $('<p>');
        var day4Humid = $('<p>');
        day4Temp.text("Temp: " + data.list[4].main.temp + "°");
        day4.append(day4Temp);
        day4Wind.text("Wind: " + data.list[4].wind.speed + "MPH")
        day4.append(day4Wind);
        day4Humid.text("Humidity: " + data.list[4].main.humidity + "%");
        day4.append(day4Humid);

        var day5 = $('#day5');
        var day5Temp = $('<p>');
        var day5Wind = $('<p>');
        var day5Humid = $('<p>');
        day5Temp.text("Temp: " + data.list[5].main.temp + "°");
        day5.append(day5Temp);
        day5Wind.text("Wind: " + data.list[5].wind.speed + "MPH")
        day5.append(day5Wind);
        day5Humid.text("Humidity: " + data.list[5].main.humidity + "%");
        day5.append(day5Humid);

    });
}

//Calls fucntion to get coordinates when search button clicked
var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', getCoords);

//Displays search history when page loads
var storedHistory = JSON.parse(localStorage.getItem("History"));
window.onload = function () {
    for (let index = 0; index < storedHistory.length; index++) {
        var listItem = document.createElement('button');
        listItem.textContent = storedHistory[index];
        userContainer.append(listItem);
        listItem.classList.add('btn-primary');
    }
}

var clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearHistory);

function clearHistory () {
    localStorage.clear();
    location.reload();
}