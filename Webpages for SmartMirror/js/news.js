document.addEventListener('DOMContentLoaded', function() {
    news.getNews();
}, false);

var news = {
    numberOfArticles: config.news.numberOfArticles,
    apiBase: config.news.feedUrl,
    intervalForDisplay: config.news.delay || 5000,
};

news.getNews = function() {
    $.ajax({
        type: 'GET',
        url: "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml",
        // url: "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.skynews.com%2Ffeeds%2Frss%2Fhome.xml",
        success: function(data) {
            var counter = 1;
            const numberOfArticles = data.items.length;

            function loop() {
                changeNewsContent();
                var loop = setInterval(changeNewsContent, news.intervalForDisplay);
            }

            function getContent(counter) {
                return data.items[counter].title;
            }

            function changeNewsContent() {
                $('#newsHeadlines').fadeOut(() => {
                    $("#newsHeadlines").html(getContent(counter));
                    $("#newsHeadlines").fadeIn(() => {
                        counter++;
                    });
                });
                if (counter >= numberOfArticles) {
                    counter = 0;
                }
            }

            loop();

        }
    });
};
