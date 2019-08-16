var Blog = require("../models/blog.js");

module.exports = function(app) {
  app.get("/api/all", function(req, res) {
    Blog.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/:artist", function(req, res) {
    Blog.findAll({
      limit: 1,
      where: {
        artist: req.params.artist
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/new", function(req, res) {

    Blog.create({
      blogAuthor: req.body.author,
      blogRating: req.body.rating,
      blogBody: req.body.body,
      created_at: req.body.created_at,
      artist: req.body.artist
    }).then(function(results) {
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
