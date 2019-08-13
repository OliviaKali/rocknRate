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

      row.append("<p>" + data[i].blogAuthor + " blogged.. </p>");
      row.append("<p>" + data[i].blogRating + " rated.. </p>");
      row.append("<p>" + data[i].blogBody + "</p>");
      row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");
      row.append("<p>" + data[i].artist + "</p>");

      $("#blog-area").prepend(row);

    }

  }
}

function createForm(data) {
  // create html form
  $("#blogComments").html(
  
  `<div class="row">
      <div class="col-md-12 list-container">
          <div class="card noteCard" style="width: 30rem;">
              <div class="card-body">
                  <h5 class="card-title">Add a Comment</h5>
                  <form>
                      <div class="form-group">
                          <label for="exampleFormControlInput1"></label>
                          <input class="form-control" type="text" id="author" placeholder="Enter Your Name">
                      </div>
                      <div class="form-group">
                      <label for="exampleFormControlInput1"></label>
                      <input class="form-control" type="text" id="rating" placeholder="Enter Your Rating">
                  </div>
                  <div class="form-group">
                  <label for="exampleFormControlInput1"></label>
                  <input class="form-control" type="text" id="artist" placeholder="Enter Your Artist">
              </div>
                      <div class="form-group">
                          <label for="exampleFormControlTextarea1"></label>
                          <textarea class="form-control" rows="3" id="blog-box" placeholder="Enter Blog Here!"></textarea>
                      </div>
                  </form>
                  <button id="blog-submit" type="button" class="btn btn-outline-secondary submit-note">Add Comment</button>
              </div>`
  );

}


// button click function 

// grab values from input field

// take all those put them into an object

// post object to api/new









