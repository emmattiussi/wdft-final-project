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
        element['logo'] = "./cbc.png"
    }
    else if (element.feed.name.match(/Democracy/gi)){
        element['logo'] = './demnow.png'
    } else if (element.feed.name.match(/mother/gi)){
        element['logo'] = "./motherjones.png"
    } else if (element.feed.name.match(/canadaland/gi)){
        element['logo'] = './canadaland.png'
    } else if (element.feed.name.match(/rolling/gi)){
        element['logo'] = './rollingstone.png'
    } else if (element.feed.name.match(/BBC/ig)){
        element["logo"] ="./bbc.png"
    } else if (element.feed.name.match(/guardian/ig)){
        element["logo"]= "./guardian.png"
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
    "http://canadaland.libsyn.com/rss", 
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

// Data tracking? 
// If new request in within 2min (e.g.) just send the old data, if not, get new data. 

// Endpoint for articles

app.get('/getarticles', (req, res) => {
    getRSSFeeds((err, articles) => {
        res.json(articles); 
    });
    
})


