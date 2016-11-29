var config = {
    lang: 'en',
    timeFormat: 'digital',
    weather: {
        weatherAPIKey: 'ea3f8ebe279a4e080459a706e2133180',
        units: 'metric',
        id: '2640726'
    },
    news: {
        numberOfArticles: 10,
        feedUrl: "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml",
		delay: 6000, //time in miliseconds for each headline to display for 1000 = 1 second
    },

};
