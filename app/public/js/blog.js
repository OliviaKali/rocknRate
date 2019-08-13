// When user clicks add-btn
$(document).on("click", "#blog-submit", function(event) {
  event.preventDefault();
  var routeName = $(".title").attr("value")

  // Make a newChirp object
  var newBlog = {
    author: $("#author").val().trim(),
    rating: $("#rating").val().trim(),
    body: $("#blog-box").val().trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    artist: routeName
  };

  console.log(newBlog)

  console.log(newBlog);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newBlog)
    // On success, run the following code
    .then(function() {

      var row = $("<div>");
      row.addClass("blog");

      row.append("<p>At " + moment(newBlog.created_at).format("h:mma on dddd") + "</p>");
      row.append("<p>" + newBlog.author + " blogged.. </p>");
      row.append("<p>Rating" + newBlog.rating + " </p>");
      row.append("<p>" + newBlog.body + "</p>");
      
      // row.append("<p>" + newBlog.artist + "</p>");

      $("#blog-area").prepend(row);

    });

  // Empty each input box by replacing the value with an empty string
  $("#author").val("");
  $("#rating").val("");
  $("#blog-box").val("");
  $("#artist").val("");
});

// When the page loads, grab all of our chirps


$("#get-blog").on("click", function(event) {
  var routeName = $(".title").attr("value")
  console.log(routeName)

  $.ajax({
    method: "GET",
    url: `/blog/${routeName}`
  }).then(function(data) {
    displayBlog(data)
    createForm(data)
  })
})

function displayBlog(data) {
  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {

      var row = $("<div>");
      row.addClass("blog");

      row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");
      row.append("<p>" + data[i].blogAuthor + " blogged.. </p>");
      row.append("<p>Rating: " + data[i].blogRating + " </p>");
      row.append("<p>" + data[i].blogBody + "</p>");
      // row.append("<p>" + data[i].artist + "</p>");

      $("#blog-area").prepend(row);

    }

  }
}

function createForm(data) {
  // create html form
  $("#blogComments").html(
  ` <div class="row">
  <div class="col-sm-5 col-sm-offset-2" style="color: white">

  <h2>Blogger Name:</h2>
  <input class="input" type="text" id="author" placeholder="Enter Your Name">
  <br>

  <h2>Rating:</h2>
  <input class="input" type="text" id="rating" placeholder="Enter Your Rating">
  <br>

  <h2>Blog Entry:</h2>
  <textarea class="textarea" id="blog-box" placeholder="Enter Blog Here!"></textarea>

  <button id="blog-submit" class="btn btn-lg pull-right">Submit!</button>
</div>

<div class="col-sm-2 col-sm-offset-2"></div>

</div>
<hr>
<div col-sm-5 col-sm-offset-2" style="color: white">
<h2>Blog Entries</h2>
</div>`
  );

}











