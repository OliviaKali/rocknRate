// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Chirp" model that matches up with DB
var Blog = sequelize.define("blog", {
  blogAuthor: Sequelize.STRING,
  blogRating: Sequelize.STRING,
  blogBody: Sequelize.TEXT,
  created_at: Sequelize.DATE,
  artist: Sequelize.STRING
});

// Syncs with DB
Blog.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = Blog;
