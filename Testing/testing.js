function weatherForecastTest(){
  $.ajax({
      type: 'GET',
      url: "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml",
      success: function(data) {
          console.log(data);
      }

  });
};

function forecastAPIkey() {
    return weather.apiBase + 'forecast?id=' + weather.weatherLocation + '&units=' + config.weather.units + '&mode=json&APPID=' + weather.apiKey;
};

weatherForecastTest();
