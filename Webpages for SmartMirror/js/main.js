function mainPage(){
  whichClock();
  getDate();
  checkAuth();
  checkCalAuth();
  news.getNews(news.mainPage);
  weather.getWeather(weather.oneDayApiKey,weather.dashboardPage);
}

function newsPage(){
    showDigitalClock();
    getDate();
    news.getNews(news.detailPage);
    scrollDiv_init();
}

function weatherPage(){
    showDigitalClock();
    getDate();
    weather.getWeather(weather.forecastApiKey,weather.forecastPage);

}
