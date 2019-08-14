var router = require("express").Router();
require("dotenv").config();
var keys = require("../../keys");
var Spotify = require("node-spotify-api");
router.post("/api/search", function(req, res) {
  var spotify = new Spotify(keys.spotify);

  spotify
    .search({ type: "artist", query: req.body.artist, limit: 3 })
    .then(function(response) {
      var artistName = response.artists.items[0].name;
      var artistGenres = response.artists.items[0].genres;
      var imageUrl = response.artists.items[0].images[0].url;
      var artistID = response.artists.items[0].id;

      var artist = {
        name: artistName,
        genres: artistGenres,
        image: imageUrl,
        id: artistID
      };
      res.json(artist);
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;