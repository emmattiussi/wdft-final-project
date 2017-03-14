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

let cbc_indig;
feed('http://www.cbc.ca/cmlink/rss-cbcaboriginal', (err, articles) => {
    if (err) throw err;
    cbc_indig = articles.map((element, index) => {
        let $ = cheerio.load(element.content);
        let src = $('img').attr('src'); 
        let alt = $('img').attr('alt');
        element["image"] = src; 
        element["alt"] = alt;
        let content = $('p').text();
        element["content"] = content; 
        return element; 
    }) 
})

// Endpoint for articles

app.get('/getarticles', (req, res) => {
    res.json(cbc_indig); 
})


