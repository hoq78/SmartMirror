function mainPage(){
  whichClock();
  getDate();
  checkAuth();
  checkCalAuth();
  news.getNews(news.mainPage);
  weather.updateCurrentWeather();
}
