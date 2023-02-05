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
        console.log(data)
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
