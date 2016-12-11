var config = {
    lang: 'en',
    timeFormat: 'digital',
    weather: {
        weatherAPIKey: 'ea3f8ebe279a4e080459a706e2133180',
        units: 'metric',
        id: '2640726'
    },
    news: {
        numberOfArticles: 19, //(number of articles to how (10 is the maximum))
        feedUrl: "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml",
        delay: 1200, //time in miliseconds for each headline to display for 1000 = 1 second
    },
    mail: {
        clientid: "338294178289-fdhuk9lqmgaatll67u30j9675t7mtpto.apps.googleusercontent.com",
        whichInboxCount: 'INBOX',
    },
    calendar:{
        howManyEvents: 8, //Max number of upcoming events you would like to see (8 is the maximum)
    }

};
