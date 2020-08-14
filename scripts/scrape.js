var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://pubmed.ncbi.nlm.nih.gov/", function(err, res, body) {
        var $ = cheerio.load(body);

        var articles = [];

        $(".full-docsum").each(function(i, element) {
            var title = $(this).children(".docsum-title").text().trim();
            var summary = $(this).children(".docsum-citation").text().trim();

            if(title && summary) {
                var titledNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();
                var summaryNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();

                var articleInfo = {
                    articleTitle: titledNeat, 
                    sum: summaryNeat
                };
                articles.push(articleInfo);
            }
        });
        cb(articles);
    });
};

module.exports = scrape; 