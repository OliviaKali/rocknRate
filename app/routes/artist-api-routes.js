const passport = require("passport");
const SpotifyStrategy = require('passport-spotify').Strategy;
require("dotenv").config();
const keys = require("../../keys.js");
var newProfile = {};

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotify.id,
      clientSecret: keys.spotify.secret,
      callbackURL: 'https://rocknrates.herokuapp.com/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      process.nextTick(function(req, res){
        newProfile = profile;
        return done(null, profile);  
      });
    }
  )
);

module.exports = function(app) {
  app.get("/api/artists", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Artist.findAll({
      include: [db.Post]
    }).then(function(dbArtist) {
      res.json(dbArtist);
    });
  });

app.get('/profileInfo', function (req, res) {
  res.json(newProfile);
});

app.get('/logout', function (req, res) {
  req.logout();
  newProfile = {};
  res.redirect("/");
});
  app.get('/auth/spotify', passport.authenticate('spotify', {
    scope: ['user-read-email']
}
  // The request will be redirected to spotify for authentication, so this
  // function will not be called.
));

  app.get('/callback', passport.authenticate('spotify'), function (req,res) {
    res.redirect("https://rocknrates.herokuapp.com/");
  })

  
  
  app.get("/api/artists/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Artist.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbArtist) {
      res.json(dbArtist);
    });
  });

  app.post("/api/artists", function(req, res) {
    db.Artist.create(req.body).then(function(dbArtist) {
      res.json(dbArtist);
    });
  });

  app.delete("/api/artists/:id", function(req, res) {
    db.Artist.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbArtist) {
      res.json(dbArtist);
    });
  });

  
};
