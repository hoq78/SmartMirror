// document.addEventListener('DOMContentLoaded', function() {
//     weather.updateCurrentWeather();
// }, false);

var weather = {
        lang: config.lang || 'en',
        apiKey: config.weather.weatherAPIKey,
        iconLookup: {
            '01d': 'wi-day-sunny',
            '02d': 'wi-day-cloudy',
            '03d': 'wi-cloudy',
            '04d': 'wi-cloudy-windy',
            '09d': 'wi-showers',
            '10d': 'wi-rain',
            '11d': 'wi-thunderstorm',
            '13d': 'wi-snow',
            '50d': 'wi-fog',
            '01n': 'wi-night-clear',
            '02n': 'wi-night-cloudy',
            '03n': 'wi-night-cloudy',
            '04n': 'wi-night-cloudy',
            '09n': 'wi-night-showers',
            '10n': 'wi-night-rain',
            '11n': 'wi-night-thunderstorm',
            '13n': 'wi-night-snow',
            '50n': 'wi-night-alt-cloudy-windy'
        },
        updateInterval: 600000,
        apiBase: 'http://api.openweathermap.org/data/2.5/',
        weatherLocation: config.weather.id || '2640726',
    }
    //Returns the full API key to be used for retrieval from the server
weather.oneDayApiKey = function() {
    return weather.apiBase + 'weather?id=' + weather.weatherLocation + '&units=' + config.weather.units + '&mode=json&APPID=' + weather.apiKey;
};

weather.forecastApiKey = function(){
    // return weather.apiBase + 'forecast?id=' + weather.weatherLocation + '&units=' + config.weather.units + '&mode=json&APPID=' +weather.apiKey + '&cnt=5';
    return 'http://api.openweathermap.org/data/2.5/forecast?q=London,us' + '&APPID=' + weather.apiKey;
}

//Round any values to an integer from a float
weather.roundValue = function(temperature) {
    return parseInt(temperature);
};

//Retrieve current Weather information
weather.getWeather = function(whichAPI,callback) {
    $.ajax({
        type: 'GET',
        url: whichAPI(),
        success: function(data) {
            weatherData = data;
            callback();
        }

    });
};

weather.dashboardPage = function(){
    let _currentTemperature = weather.roundValue(weatherData.main.temp) + '°C',
        _iconClass = weatherData.weather[0].icon,
        _icon = "wi " + weather.iconLookup[_iconClass] + " wi-fw";
    _tempHigh = weather.roundValue(weatherData.main.temp_max);
    _tempLow = weather.roundValue(weatherData.main.temp_min);
    _location = weatherData.name + ", " + weatherData.sys.country;
    //Lets Certain IDs in HTML have these values as well as change the class of the icon container so the correct icon is displayed
    document.getElementById("tempCurrent").innerHTML = _currentTemperature;
    $('#weatherGlyphicon').attr('class', _icon);
    document.getElementById("tempHighLow").innerHTML = _tempHigh.toString() + "°C/" + _tempLow.toString() + "°C";
    document.getElementById("tempLocation").innerHTML = _location;
}

weather.forecastPage = function(){
    currentDate = new Date();
    fiveDayWeatherGrouping = [[],[],[],[],[]];
    for(i=0;i<fiveDayWeatherGrouping.length;i++){
        for(j=0;j<weatherData.list.length;j++){
            if(currentDate.toISOString().slice(0,10) === weatherData.list[j].dt_txt.slice(0,10)){
                    fiveDayWeatherGrouping[i].push(weatherData.list[j]);
            }
        }
    currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(fiveDayWeatherGrouping);
}

//Updates the current weather every 600000 milliseconds (10 minutes)
setInterval(weather.updateCurrentWeather, weather.updateInterval);
