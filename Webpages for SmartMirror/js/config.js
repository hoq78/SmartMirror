var config = {
    lang: 'en',
    timeFormat: 'analogue',
    weather: {
        weatherAPIKey: 'ea3f8ebe279a4e080459a706e2133180',
        units: 'metric',
        id: '2640729' // The default is Oxford, to change go to Openweathermap.org to find your City ID
    },
    news: {
        numberOfArticles: 20, // number of articles to show on detailed page
        feedUrl: "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml",
        delay: 1200, // time in miliseconds for each headline to display on the dashboard (1000 = 1 second)
        scrollRate: 100, // Less time equals quicker scroll speed
    },
    mail: {
        clientid: "338294178289-fdhuk9lqmgaatll67u30j9675t7mtpto.apps.googleusercontent.com",
        whichInboxCount: 'INBOX',
        howManyEmails: 20,
    },
    calendar:{
        howManyEvents: 8,
    }

};
