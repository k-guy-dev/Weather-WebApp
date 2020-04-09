var express = require('express');
var fetch = require('node-fetch');
var request = require('request');
var app = express();


app.get('/', function (req, res) {
    request("https://ipinfo.io/json", function (error, response, body) {
        ipData = JSON.parse(body);
        var result = ipData['city'];
        request("https://api.openweathermap.org/data/2.5/weather?q=" + result + "&units=metric&apikey=b333c64cdb504283a6ff65d4b3e25c2d", function (error, response, body) {
            var weather_json = JSON.parse(body);
            console.log(weather_json);
            var weatherInfo = {
                city: result,
                temperature: Math.round(weather_json.main.temp),
                desc: weather_json.weather[0].description,
                icon: weather_json.weather[0].icon
            }

            res.render('main.ejs', { weatherInfo: weatherInfo });
        });
    });
});

app.listen(3000, function () {
    console.log('SERVER STARTUP SUCCESSFULL');
});