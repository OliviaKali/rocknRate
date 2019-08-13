$(document).ready(function() {
  // $("blogPosts").hide();
  var searchInput = $.getUrlVar('s');
  if (null !== searchInput) {
    var decodedSearch = decodeURIComponent(searchInput)
    searchArtist(decodedSearch);
  }

  //executed on first page and searchbar on second page
  $("#userSearch").on("click", function() {
    event.preventDefault();
    var userInput = $("#userInput")
      .val()
      .trim();
var url = "/artist?s=" + encodeURIComponent(userInput);
      $(location).attr('href',url);
    // searchArtist(userInput);
  });

  $("#userSearchNav").on("click", function() {
    event.preventDefault();
    var userInput = $("#userInput")
      .val()
      .trim();
    searchArtist(userInput);
  });
});

function searchArtist(userInput) {
  console.log(userInput)
  $.ajax({
    method: "POST",
    url: "/api/search/",
    data: {"artist": userInput}
  }).then(function(response) {
    console.log(response)
    
    $("#artistPlayerDiv").html(
      // <div class="tile is-ancestor">
      //     <div class="tile is-vertical is-8">
      //       <div class="tile">
      //         <div class="tile is-parent is-vertical">
      //           <article class="tile is-child box">
      //             <p class="title">Spotify</p>
      //             <p class="subtitle">Top Left</p>
                  `<iframe  class="spotifyPlayer" src="https://open.spotify.com/embed/artist/${response.id}" width="650"
                      height="500" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
      //             </article>
                 
      // </div>
    );

    $("#artistImageDiv").html(
              `<article class="tile is-child box">
              <p class="title" value="${response.name}">${response.name}</p>
              <img id="artistImage" class="imageSize" src="${response.image}" />
              <p>Genres: ${response.genres}</p>
      </article>`
    );

  });
}

$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});


$("#get-blog").on("click", function(event) {
  var routeName = $(".title").attr("value")
  console.log(routeName)

  $.ajax({
    method: "GET",
    url: `/blog/${routeName}`
  }).then(function(result) {
    console.log(result)
    // $("blogPosts").show();
  })
})