function mainPage(){
  whichClock();
  getDate();
  checkAuth(inboxCount);
  checkCalAuth(showNextEvent);
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

function mailPage(){
  showDigitalClock();
  getDate();
  checkAuth(detailedMail);
  scrollDiv_init();
}

function calendarPage(){
    showDigitalClock();
    getDate();
    checkCalAuth(detailedCalendarPage);
    scrollDiv_init();
}
