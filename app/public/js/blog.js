/* global moment */

var moment = require("moment");

// When user clicks add-btn
$("#blog-submit").on("click", function(event) {
  event.preventDefault();

  // Make a newChirp object
  var newBlog = {
    author: $("#author").val().trim(),
    rating: $("#rating").val().trim(),
    body: $("#blog-box").val().trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    artist: $("#artist").val().trim()
  };

  console.log(newBlog);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newBlog)
    // On success, run the following code
    .then(function() {

      var row = $("<div>");
      row.addClass("blog");

      row.append("<p>" + newBlog.author + " blogged.. </p>");
      row.append("<p>" + newBlog.rating + " rated.. </p>");
      row.append("<p>" + newBlog.body + "</p>");
      row.append("<p>At " + moment(newBlog.created_at).format("h:mma on dddd") + "</p>");
      row.append("<p>" + newBlog.artist + "</p>");

      $("#blog-area").prepend(row);

    });

  // Empty each input box by replacing the value with an empty string
  $("#author").val("");
  $("#rating").val("");
  $("#blog-box").val("");
  $("#artist").val("");
});

// When the page loads, grab all of our chirps
$.get("/api/all", function(data) {

  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {

      var row = $("<div>");
      row.addClass("blog");

      row.append("<p>" + data[i].blogAuthor + " blogged.. </p>");
      row.append("<p>" + data[i].blogRating + " rated.. </p>");
      row.append("<p>" + data[i].blogBody + "</p>");
      row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");
      row.append("<p>" + data[i].artist + "</p>");

      $("#blog-area").prepend(row);

    }

  }

});
