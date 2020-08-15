// var request = require("request");
// var cheerio = require("cheerio");

// var scrape = function (cb) {
//     request("https://www.sciencenews.org/topic/astronomy", function(err, res, body) {
//         var $ = cheerio.load(body);

//         var articles = [];

//         $(".post-item-river__title___J3spU").each(function(i, element) {
//             var title = $(this).children(".post-item-river__title___J3spU").text().trim();
//             var summary = $(this).children(".post-item-river__excerpt___3ok6B").text().trim();
            
//             if(title && summary) {
//                 var titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();
//                 var summaryNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();

//                 var articleInfo = {
//                     articleTitle: titleNeat, 
//                     sum: summaryNeat
//                 };
//                 articles.push(articleInfo);
//             }
//         });
//         cb(articles);
//     });
// };

// module.exports = scrape; 