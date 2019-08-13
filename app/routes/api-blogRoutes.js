// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Blog = require("../models/blog.js");

// Routes
// =============================================================
module.exports = function(app) {
  // Get all chirps
  app.get("/api/all", function(req, res) {
    // Finding all Chirps, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous, which helps with perceived speed.
    // If we want something to be guaranteed to happen after the query, we'll use
    // the .then function
    Blog.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });

  app.get("/api/:artist", function(req, res) {
    // Finding all Chirps, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous, which helps with perceived speed.
    // If we want something to be guaranteed to happen after the query, we'll use
    // the .then function
    Blog.findAll({
      limit: 1,
      where: {
        artist: req.params.artist
      }
    }).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
      // console.log(results);
      // res.redirect("/");
    });
  });

  // Add a chirp
  app.post("/api/new", function(req, res) {
    // console.log("Blog Data:");
    console.log(req.body);

    Blog.create({
      blogAuthor: req.body.author,
      blogRating: req.body.rating,
      blogBody: req.body.body,
      created_at: req.body.created_at,
      artist: req.body.artist
    }).then(function(results) {
      // `results` here would be the newly created chirp
      res.json(results)
    });
  });

  app.get("/blog/:artistName", function(req, res) {
    Blog.findAll({
      where: {
        artist: req.params.artistName
      }
    })
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
};
