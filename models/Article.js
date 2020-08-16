// hold mongoose schemas and info to be saved to the database

var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema ({
  headline: {
      type: String,
      required: true
  },
  summaryOne: {
      type: String,
      required: true
  },
  summaryTwo: {
      type: String,
      required: false
  },
  link: {
      type: String,
      required: true
  },
  saved: {
      type: Boolean,
      default: false
  },
  note: 
      []
  
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
