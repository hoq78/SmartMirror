

var newsInterval = null;
var newsData = [];
var bbcNewsData = null;
var counter = null;
var bbcDone = false;
var dovDone = false;
var dictOfDoverbroecksItems = {};
var doverCount = 0;

var news = {
    intervalForDisplay: config.news.delay || 5000,
};

function getContent(counter) {
    return newsData[counter][1];
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
    if (counter >= config.news.numberOfBbcArticles+config.news.numberOfDoverbroecksArticles) {
        news.getNews();
        counter = 0;
    }
}

news.getBbcNewsData = function(callback){
  $.ajax({
      type: 'GET',
      url: config.news.bbcUrl,
      // url: "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.skynews.com%2Ffeeds%2Frss%2Fhome.xml",
      success: function(data) {
          bbcNewsData = data.items.slice(0,config.news.numberOfBbcArticles);
          bbcDone = true;
          callback();
          }
  });
}
news.getNews = function(callback) {
  news.getBbcNewsData(callback);
  getDoverbroecksNewsData(callback);

}

function populateNewsData(){
  for(i=0;i<bbcNewsData.length;i++){
    item = bbcNewsData[i];
    newsData.push([new Date(item.pubDate),item.title,item.content]);
  }
  for(key in dictOfDoverbroecksItems){
    item = dictOfDoverbroecksItems[key];
    newsData.push([item[1], item[0], item[2]]);
  }
  newsData = mergeSort(newsData);
  console.log(newsData);
}

news.mainPage = function(){
  if(!dovDone || !bbcDone){
    console.log('not finished');
    return;
  }
  populateNewsData();
  console.log('finished');
  counter = 0;
  changeNewsContent();
  if(newsInterval==null){
    changeNewsContent()
    newsInterval = setInterval(changeNewsContent,1000*6);
  }
}

news.detailPage = function(){
  if(!dovDone || !bbcDone){
    console.log('not finished');
    return;
  }
  populateNewsData();
  var table = document.getElementById('newsTable');
  for(i=0; i < config.news.numberOfBbcArticles + config.news.numberOfDoverbroecksArticles;i++){
    var item = "item" + i.toString();
    var newsHeadline = table.insertRow();
    var headline = newsHeadline.insertCell();
    headline.id = item;
    document.getElementById(headline.id).className = 'HeadlineRow';
    var newsContent = table.insertRow();
    var content = newsContent.insertCell();
    content.id = item+"content";
    document.getElementById(content.id).className = 'ContentRow';
    newsHeadlineVar = newsData[i][1];
    newsContentVar = newsData[i][2];
    $("#"+item).html(newsHeadlineVar);
    $("#"+item+"content").html(newsContentVar);
  }
}


function getDoverbroecksNewsData(callback){
$.ajax({
  type:'GET',
  url:config.news.doverbroecksUrl,
  success: function(data){
    scrapeDoverbroecksNews(data,callback);
  }
});
}

function addDoverbroecksTimestamp(url,callback){
  function helper(data){
    parser = new DOMParser()
    htmlDoc = parser.parseFromString(data,'text/html')
    list = htmlDoc.getElementsByTagName('head')[0].getElementsByTagName('meta')
    for(i=0;i<list.length;i++){
      if( list[i].getAttribute('property') == 'article:published_time'){
        dictOfDoverbroecksItems[url][1] = new Date(list[i].getAttribute('content'));
        doverCount += 1
      }
      if( list[i].getAttribute('name') == 'twitter:description'){
        dictOfDoverbroecksItems[url][2] = list[i].getAttribute('content');
      }
    }
    if(doverCount == config.news.numberOfDoverbroecksArticles){
      dovDone = true;
      callback()
    }
  }
  $.ajax({
    type:'GET',
    url:url,
    success: helper
  });

}

function scrapeDoverbroecksNews(data,callback){

  parser = new DOMParser();
  htmlDoc = parser.parseFromString(data,'text/html');
  list = htmlDoc.getElementById('category-posts-7-internal');
  items = list.getElementsByTagName('li');
  for(i=0;i<config.news.numberOfDoverbroecksArticles;i++){
    atag = items[i].getElementsByTagName('a')[0]
    dictOfDoverbroecksItems[atag.href]= [atag.text, null, null ];
    addDoverbroecksTimestamp(atag.href,callback)
  }
}
