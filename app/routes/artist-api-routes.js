var db = require("../models");
const passport = require("passport");
const SpotifyStrategy = require('passport-spotify').Strategy;

// var User = {
//   findOrCreate: function(obj) {
//     if (obj)
//     {
//       res.redirect("/public/index.html");
//     }
//   }
// }
passport.use(
  new SpotifyStrategy(
    {
      clientID: "d50ce48e78f34aa39c48d92fb71b19d1",
      clientSecret: "e9aa1cb7fb41429da0a797966b92fbff",
      callbackURL: 'http://localhost:8080/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      process.nextTick(function(){
        console.log(profile);
        return done(null, profile);
        
      });
    }
  )
);
// var user = new User({
//   name: profile.d,
//   email: profile.emails[0].value,
//   username: profile.username,
//   provider: 'spotify',
//   //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
//   facebook: profile._json
// })

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

  app.get('/auth/spotify', passport.authenticate('spotify', {
      scope: ['user-read-email']
  }
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  ));

  app.get('/auth/spotify/callback', passport.authenticate('spotify'), function (req,res) {
    res.send("Callback");

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

