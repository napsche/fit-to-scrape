var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_215wrxkj:dbrillitjms5qsrqap1tk2ru60@ds215019.mlab.com:15019/heroku_215wrxkj', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_215wrxkj:dbrillitjms5qsrqap1tk2ru60@ds215019.mlab.com:15019/heroku_215wrxkj";

// mongoose.connect(MONGODB_URI);

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  

