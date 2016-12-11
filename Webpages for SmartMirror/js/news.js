

var newsInterval = null;
var newsData = null;
var counter = null;

// document.addEventListener('DOMContentLoaded', function() {
//     news.getNews(news.mainPage);
// }, false);

var news = {
    numberOfArticles: config.news.numberOfArticles,
    apiBase: config.news.feedUrl,
    intervalForDisplay: config.news.delay || 5000,
};

function getContent(counter) {
    return newsData[counter].title;
}

function changeNewsContent() {
    if( newsData == null){
      return;
    }
    $('#newsHeadlines').fadeOut(() => {
        $("#newsHeadlines").html(getContent(counter));
        $("#newsHeadlines").fadeIn(() => {
            counter++;
        });
    });
    if (counter >= news.numberOfArticles) {
        news.getNews();
        counter = 0;
    }
}


news.getNews = function(callback) {
    $.ajax({
        type: 'GET',
        url: "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml",
        // url: "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.skynews.com%2Ffeeds%2Frss%2Fhome.xml",
        success: function(data) {
            newsData = data.items;
            callback();
            }
    });
}

news.mainPage = function(){
  counter = 0;
  changeNewsContent();
  if(newsInterval==null){
    changeNewsContent()
    newsInterval = setInterval(changeNewsContent,1000*6);
  }
}

news.detailPage = function(){
  var table = document.getElementById('newsTable');
  for(i=0; i < news.numberOfArticles;i++){
    var item = "item" + i.toString();
    var newsHeadline = table.insertRow();
    var headline = newsHeadline.insertCell();
    headline.id = item;
    document.getElementById(headline.id).className = 'HeadlineRow';
    var newsContent = table.insertRow();
    var content = newsContent.insertCell();
    content.id = item+"content";
    document.getElementById(content.id).className = 'ContentRow';
    newsHeadlineVar = newsData[i].title;
    newsContentVar = newsData[i].content;
    $("#"+item).html(newsHeadlineVar);
    $("#"+item+"content").html(newsContentVar);
  }
}
