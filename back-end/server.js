const express = require('express');
const feed = require('feed-read');
const cheerio = require('cheerio');

const app = express();


// Run Server
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080. Press ctrl+C to stop.')
})

// Get RSS Feeds

let cbc_indig;
feed('http://www.cbc.ca/cmlink/rss-cbcaboriginal', (err, articles) => {
    if (err) throw err;
    cbc_indig = articles.map((element, index) => {
        let $ = cheerio.load
    })
})




