$(document).on("click", "#blog-submit", function(event) {
  event.preventDefault();
  var routeName = $(".title").attr("value");

  var newBlog = {
    author: $("#author")
      .val()
      .trim(),
    rating: $("#rating")
      .val()
      .trim(),
    body: $("#blog-box")
      .val()
      .trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    artist: routeName
  };
  console.log(newBlog);

  $.post("/api/new", newBlog)
    // On success, run the following code
    .then(function() {
      var row = $("<div>");
      row.addClass("blog");

      row.append(`<div class="column is-full">
      <p>At ${moment(newBlog.created_at).format("h:mma on dddd")}</p>
      <p>${newBlog.author} blogged...</p>
      <p>Rating: ${newBlog.rating}</p>
      <p>${newBlog.body}</p>
      </div>`);

      $("#blog-area").prepend(row);
    });

  $("#author").val("");
  $("#rating").val("");
  $("#blog-box").val("");
  $("#artist").val("");
});

$("#get-blog").on("click", function(event) {
  var routeName = $(".title").attr("value");
  console.log(routeName);

  $.ajax({
    method: "GET",
    url: `/blog/${routeName}`
  }).then(function(data) {
    displayBlog(data);
    createForm(data);
  });
});

function displayBlog(data) {
  if (data.length !== 0) {
    for (var i = 0; i < data.length; i++) {
      var row = $("<div>");
      row.addClass("blog");
      row.append(`<div class="column is-full">
      <p>At ${moment(data[i].created_at).format("h:mma on dddd")}</p>
      <p>${data[i].blogAuthor} blogged...</p>
      <p>Rating: ${data[i].blogRating}</p>
      <p>${data[i].blogBody}</p>
      </div>`);

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

  <button id="blog-submit" class="button is-black">Submit!</button>
</div>

<div class="col-sm-2 col-sm-offset-2"></div>

</div>
<hr>
<div col-sm-5 col-sm-offset-2" style="color: white">
<h2>Blog Entries</h2>
</div>`
  );
}
