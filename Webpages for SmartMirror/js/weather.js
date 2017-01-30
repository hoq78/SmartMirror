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

weather.forecastApiKey = function() {
    // return 'http://api.openweathermap.org/data/2.5/forecast?id=' + weather.weatherLocation + '&units=metric&mode=json&APPID=' + weather.apiKey;
    return weather.apiBase + 'forecast?q=oxford,gb' + '&units=' + config.weather.units + '&mode=json&APPID=' + weather.apiKey;

    // return 'http://api.openweathermap.org/data/2.5/forecast?q=London,GB&units=metric&mode=json&APPID=' + weather.apiKey;
}

//Round any values to an integer from a float
weather.roundValue = function(temperature) {
    return parseInt(temperature);
};

//Retrieve current Weather information
weather.getWeather = function(whichAPI, callback) {
    $.ajax({
        type: 'GET',
        url: whichAPI(),
        success: function(data) {
            weatherData = data;
            callback();
        }

    });
};

weather.dashboardPage = function() {
    console.log(weatherData);
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

getRainData = function(data) {
    rainData = [];
    for (count = 0; count < data.length; count++) {
        for (hour = 0; hour < data[count].length; hour++) {
            if (typeof(data[count][hour].rain)) {
                rainData.push('0');
            } else {
                rainData.push(data[count][hour].rain['3h'])
            };
        };
    }
return rainData;
}

getTemp = function(data){
    tempData = [];
    for (count = 0; count < data.length; count++) {
        for (hour = 0; hour < data[count].length; hour++) {
            if (typeof(data[count][hour].main.temp) === 'undefined') {
                tempData.push('0');
            } else {
                tempData.push(data[count][hour].main.temp);
            };
        };
    }
    return tempData
}

getXAxisData = function(data){
    xAxisData = [];
    for(count=0;count<data.length;count++){
        for(hour=0;hour<data[count].length;hour++){
            xAxisData.push(data[count][hour].dt_txt.slice(5));
        }
    }
    return xAxisData;
}
weather.forecastPage = function() {
    currentDate = new Date();
    fiveDayWeatherGrouping = [
        [],
        [],
        [],
        [],
        []
    ];
    for (i = 0; i < fiveDayWeatherGrouping.length; i++) {
        for (j = 0; j < weatherData.list.length; j++) {
            if (currentDate.toISOString().slice(0, 10) === weatherData.list[j].dt_txt.slice(0, 10)) {
                fiveDayWeatherGrouping[i].push(weatherData.list[j]);
            }
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(fiveDayWeatherGrouping[0][0]);

    xAxisData = getXAxisData(fiveDayWeatherGrouping);

    rainData = getRainData(fiveDayWeatherGrouping);

    tempData = getTemp(fiveDayWeatherGrouping);


    $(function() {
        var myChart = Highcharts.chart('container', {
            chart: {
                color:'#FFFFFF',
                zoomType: 'xy',
                backgroundColor: '#000000',
                fontSize:'60px'
            },
            title: {
                text: '5 Day Weather',
                style:{
                color: '#FFFFFF',
                fontSize:'60px'
            }
            },
            xAxis: [{
                categories: xAxisData,
                color:'#FFFFFF',
                crosshair: true,
                labels: {
                    style:{
                        color:'#FFFFFF',
                        fontSize:'40px',
                        fontWeight:'bold'
                    }
                }
            }],
            yAxis: [{ //Primary Axis
                labels: {
                    format: '{value}°C',
                    style: {
                        color: '#FFFFFF',
                        fontSize:'20px'
                    }
                },
                title: {
                    text: 'Temperature',
                    style: {
                        color: '#FFFFFF',
                        fontSize:'20px'
                    }
                }
            }, { //Secondary Axis
                title: {
                    text: 'Precipitation',
                    style: {
                        color: '#FFFFFF',
                        fontSize:'20px'
                    }
                },
                labels: {
                    format: '{value} mm',
                    style: {
                        color: '#FFFFFF'
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true

            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 150,
                verticalAlign: 'top',
                y: 100,
                floating: true,
                backgroundColor: '#000000',
                itemStyle:{
                    color:'#FFFFFF',
                    fontSize:'15px'
                }
            },
            series: [{
                name: 'Precipitation',
                type: 'column',
                yAxis: 1,
                // data: [fiveDayWeatherGrouping[0][0].rain["3h"], fiveDayWeatherGrouping[1][0].rain["3h"], fiveDayWeatherGrouping[2][0].rain["3h"], fiveDayWeatherGrouping[3][0].rain["3h"], fiveDayWeatherGrouping[4][0].rain["3h"]],
                data: rainData,
                color:'#34576d',
                tooltop: {
                    valueSuffix: ' mm'
                }
            }, {
                name: 'Temperature',
                type: 'spline',
                data: tempData,
                tooltip: {
                    valueSuffix: ' °C'
                }
            }]
        });
    });
}

//Updates the current weather every 600000 milliseconds (10 minutes)
setInterval(weather.updateCurrentWeather, weather.updateInterval);
