function mainPage(){
  whichClock();
  getDate();
  checkAuth();
  checkCalAuth();
  news.getNews(news.mainPage);
  weather.updateCurrentWeather();
}

function newsPage(){
    showDigitalClock();
    getDate();
    news.getNews(news.detailPage);
    scrollDiv_init();
}
