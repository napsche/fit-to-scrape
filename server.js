//set up Node server
//include routes

var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000; 

// Initialize Express
var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(router);

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Require all models
// var db = require("./models");
var db = process.env.MONGODB_URI || "mongodb://heroku_215wrxkj:dbrillitjms5qsrqap1tk2ru60@ds215019.mlab.com:15019/heroku_215wrxkj";

// Connect to the Mongo DB
mongoose.connect(db, function(error) {
    if (error) {
      console.log(error);
    }
    else {
      console.log("Mongoose connection is successful")
    }
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  

  