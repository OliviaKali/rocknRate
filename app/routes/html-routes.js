var path = require("path");

module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //route to the blog page with spotify
  app.get("/artist", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blogtwo.html"));
  });

  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  })

  app.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/about.html"));
  });
};
