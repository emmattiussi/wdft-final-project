const express = require('express');
const feed = require('feed-read');
const cheerio = require('cheerio');

const app = express();


// Run Server
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080. Press Ctrl+C to stop.')
})

// Access-Control-Allow-Origin

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Get RSS Feeds

let articleClean = function(element){
    let $ = cheerio.load(element.content);
    let src = $('img').attr('src');
    if (src && src.match(/http/gi)){
        element["image"] = src;
    }
    element["alt"] = $('img').attr('alt');
    element["content"] = $('p').text();
    if (element.feed.name.match(/CBC/gi)){
        element['logo'] = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/CBC_Logo_1992-Present.svg/500px-CBC_Logo_1992-Present.svg.png"
    }
    else if (element.feed.name.match(/Democracy/gi)){
        element['logo'] = 'https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Democracy_Now!_logo.svg/1200px-Democracy_Now!_logo.svg.png'
    } else if (element.feed.name.match(/mother/gi)){
        element['logo'] = "http://www.motherjones.com/sites/all/assets/MJ_comp.png"
    } else if (element.feed.name.match(/canadaland/gi)){
        element['logo'] = 'http://www.canadalandshow.com/wp-content/uploads/2016/04/cl-logo-49d2eedb1c41d9348d97c04b515dc0d05de06271c424ea11c6bec43f2bd24a48.png'
    } else if (element.feed.name.match(/rolling/gi)){
        element['logo'] = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Rolling_Stone_logo.svg/3000px-Rolling_Stone_logo.svg.png'
    } else if (element.feed.name.match(/BBC/ig)){
        element["logo"] ="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/BBC_News.svg/640px-BBC_News.svg.png"
    } else if (element.feed.name.match(/guardian/ig)){
        element["logo"]= "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/The_Guardian.svg/2000px-The_Guardian.svg.png"
    }
    
    // else if (element.feed.name.match(/jazeera/gi)){
    //     element['logo'] = 
    //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Al-jazeera-logo.jpg';
    // }
    return element;
}

let articles = [];

let RSSFeeds = [
    'http://www.cbc.ca/cmlink/rss-cbcaboriginal', 
    'https://www.democracynow.org/democracynow.rss', 
    'http://feeds.feedburner.com/motherjones/BlogsAndArticles', 
    // "http://canadaland.libsyn.com/rss", 
    "http://feeds.bbci.co.uk/news/rss.xml",
    "http://www.rollingstone.com/culture/rss", 
    "https://www.theguardian.com/international/rss",
    "http://rss.cbc.ca/lineup/topstories.xml"
    // "http://www.aljazeera.com/xml/rss/all.xml"
]

let getRSSFeeds = function(cb){
    feed(RSSFeeds, (err, arts) => {
        if (err) return cb(err); 
        articles = arts.map((element, index) => {
            articleClean(element); 
            return element; 
        })
        return cb(null, articles);
    })
}

// Endpoint for articles

app.get('/getarticles', (req, res) => {
    getRSSFeeds((err, articles) => {
        res.json(articles); 
    });
    
})


