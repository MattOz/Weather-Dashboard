fetch('http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=6605e894b2d120e2bc470b6d7f80fe1b')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
