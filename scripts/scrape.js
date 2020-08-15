var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.nytimes.com", function(err, res, body) {
        var $ = cheerio.load(body);

        var articles = [];

        $(".theme-summary").each(function(i, element) {
            var title = $(this).children(".story-heading").text().trim();
            var summary = $(this).children(".summary").text().trim();

            if(title && summary) {
                var titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();
                var summaryNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();

                var articleInfo = {
                    articleTitle: titleNeat, 
                    sum: summaryNeat
                };
                articles.push(articleInfo);
            }
        });
        cb(articles);
    });
};

module.exports = scrape; 