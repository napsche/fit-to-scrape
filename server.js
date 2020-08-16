// //set up Node server
// //include routes
// var express = require("express");
// var mongoose = require("mongoose");
// var exphbs = require("express-handlebars");
// var bodyParser = require("body-parser");
// var logger = require('morgan');

// var axios = require("axios");
// var cheerio = require("cheerio");


// var PORT = process.env.PORT || 3000; 

// // Initialize Express
// var app = express();

// // var router = express.Router();

// // require("./config/routes")(router);

// app.use(express.static("public"));
// app.use(express.static(__dirname + "/public"));

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");
// app.set('index', __dirname + '/views');

// app.use(logger('dev'));
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

// var routes = require('./controllers/controller.js');
// app.use('/', routes);

// // Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Require all models
// var db = require("./models");

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_215wrxkj:dbrillitjms5qsrqap1tk2ru60@ds215019.mlab.com:15019/heroku_215wrxkj";

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
// var results = [];

// // Connect to the Mongo DB
// // mongoose.connect(MONGODB_URI, function(error) {
// //     if (error) {
// //       console.log(error);
// //     }
// //     else {
// //       console.log("Mongoose connection is successful")
// //     }
// // });

// //routes
// app.get("/scrape", function(req, res) {
//   // First, we grab the body of the html with axios
//   axios.get("https://www.sciencenews.org/").then(function(response) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     var $ = cheerio.load(response.data);

//     // Now, we grab every h2 within an article tag, and do the following:
//     $("article h2").each(function(i, element) {
//       var headline = $(element).text();
//       var link = "https://www.sciencenews.org/";
//       link = link + $(element).parents("a").attr("href");
//       var summaryOne = $(element).parent().parent().siblings().children("li-first-child").text();
//       var summaryTwo = $(element).parent().parent().siblings().children("li-last-child").text();

//       if (headline && summaryOne && link) {
//         results.push({
//           headline: headline, 
//           summaryOne: summaryOne,
//           summaryTwo: summaryTwo, 
//           link: link
//         })
//       }
//     });

//       // Create a new Article using the `result` object built from scraping
//       db.Article.create(results)
//         .then(function(dbArticle) {
//           res.render("index", { dbArticle });
//           console.log(dbArticle);
//         })
//         .catch(function(err) {
//           console.log(err);
//         })
//       app.get("/", function (req, res) {
//         res.render("index")
//       })
//     });

//     app.put("/update/:id", function(req, res) {
//       console.log("we're here");
//       db.Article.updateOne({ _id: req.params.id }, { $set: { saved: true } }, function(err, result) {
//         if (result.changedRows == 0) {
//           return res.status(404).end();
//         } 
//         else {
//           res.status(200).end();
//         }
//       });
//     });

//     app.put("/unsave/:id", function(req, res) {
//       console.log("Hereeeeeeee");
//       console.log(req.body);
//       db.Article.updateOne({ _id: req.params.id }, { $set: { saved: false }}, function(err, result) {
//           if (result.changedRows == 0) {
//               return res.status(404).end();
//           } else {
//               res.status(200).end();
//           }
//       });
//     });

//     app.put("/newnote/:id", function(req, res) {
//       console.log("New note");
//       console.log(req.body);
//       console.log(req.body._id);
//       console.log(req.body.note);
//       db.Article.updateOne({ _id: req.body._id }, { $push: { note: req.body.note }}, function(err, result) {
//           console.log(result)
//           if (result.changedRows == 0) {
//               return res.status(404).end();
//           } else {
//               res.status(200).end();
//           } 
//       });
//     });

//     app.get("/saved", function (req, res) {
//       var savedArticles = [];
//       db.Article.find({ saved: true }, function (err, saved) {
//           if (err) throw err;
//           savedArticles.push(saved);
//           res.render("saved", { saved });
//       });
//     });
  

//   });


// app.listen(PORT, function() {
//     console.log("App running on port " + PORT + "!");
//   });
  

var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models")

var port = process.env.PORT || 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set('index', __dirname + '/views');

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_215wrxkj:dbrillitjms5qsrqap1tk2ru60@ds215019.mlab.com:15019/heroku_215wrxkj";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var results = [];

// Start routes here...
app.get("/", function (req, res) {
    db.Article.find({ saved: false }, function (err, result) {
        if (err) throw err;
        res.render("index", { result })
    })

});
app.get("/newscrape", function (req, res) {
    axios.get("https://www.sciencenews.org/").then(function (response) {
        var $ = cheerio.load(response.data)
        $("h2 span").each(function (i, element) {
            var headline = $(element).text();
            var link = "https://www.sciencenews.org/";
            link = link + $(element).parents("a").attr("href");
            var summaryOne = $(element).parent().parent().siblings().children("li:first-child").text();
            var summaryTwo = $(element).parent().parent().siblings().children("li:last-child").text();

            if (headline && summaryOne && link) {
                results.push({
                    headline: headline,
                    summaryOne: summaryOne,
                    summaryTwo: summaryTwo,
                    link: link
                })
            }
        });
        db.Article.create(results)
            .then(function (dbArticle) {
                res.render("index", { dbArticle });
                console.log(dbArticle);
            })
            .catch(function (err) {
                console.log(err);
            })
        app.get("/", function (req, res) {
            res.render("index")
        })
    })
});

app.put("/update/:id", function (req, res) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!")
    db.Article.updateOne({ _id: req.params.id }, { $set: { saved: true } }, function (err, result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
app.put("/unsave/:id", function(req, res) {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    console.log(req.body)
    db.Article.updateOne({ _id: req.params.id }, { $set: { saved: false }}, function(err, result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

app.put("/newnote/:id", function(req, res) {
    console.log("**********************************")
    console.log(req.body)
    console.log(req.body._id);
    console.log(req.body.note);
    db.Article.updateOne({ _id: req.body._id }, { $push: { note: req.body.note }}, function(err, result) {
        console.log(result)
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        } 
    })
})



app.get("/saved", function (req, res) {
    var savedArticles = [];
    db.Article.find({ saved: true }, function (err, saved) {
        if (err) throw err;
        savedArticles.push(saved)
        res.render("saved", { saved })
    })
})


app.listen(port, function () {
    console.log("Server listening on: http://localhost:" + port);
})
