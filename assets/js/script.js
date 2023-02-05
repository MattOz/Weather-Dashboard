fetch('http://api.openweathermap.org/geo/1.0/direct?q=Chicago&limit=5&appid=6605e894b2d120e2bc470b6d7f80fe1b')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

var userContainer = document.getElementById('userHistory');
var userLat
var userLon

function getCoords () {

    var userInput = document.getElementById('userInput').value;
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=6605e894b2d120e2bc470b6d7f80fe1b'


    fetch(requestUrl)
    .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        userLat = data[0].lat
        userLon = data[0].lon
        console.log(userLat);
        console.log(userLon);
        getWeather();
    });

    var allEntries = JSON.parse(localStorage.getItem("History")) || [];
    allEntries.push(userInput);
    localStorage.setItem("History", JSON.stringify(allEntries));

    var listItem = document.createElement('li');
    listItem.textContent = userInput;
    userContainer.append(listItem);
}

function getWeather () {
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + userLat + '&lon=' + userLon + '&appid=6605e894b2d120e2bc470b6d7f80fe1b'
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', getCoords);
var storedHistory = JSON.parse(localStorage.getItem("History"));

window.onload = function () {
    for (let index = 0; index < storedHistory.length; index++) {
        var listItem = document.createElement('li');
        listItem.textContent = storedHistory[index];
        userContainer.append(listItem);
    }
}
