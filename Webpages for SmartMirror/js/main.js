/**
* Functions that run on load of each of the different pages,
* They run all the functions required to get all the information and display it
*/

function mainPage(){
  whichClock();
  getDate();
  checkAuth(inboxCount);
  checkCalAuth(showNextEvent);
  getNews(newsMainPage);
  weather.getWeather(weather.oneDayApiKey,weather.dashboardPage);
}

function newsPage(){
    showDigitalClock();
    getDate();
    getNews(newsDetailPage);
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
