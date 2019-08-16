# rocknRate

Music blog that provides users with a unique experience to search their favorite artists and be able to comment/rate them as well as listen to their songs through the spotify API and read some information about them all in the same place. Experience can be personalized by spotify authentication and logging into spotify.


Check out our website!
https://rocknrates.herokuapp.com


## Built with

Node, Express, MySQL, Spotify API, Sequelize, Bulma, Materialize, Passport, Spotify-Passport.
MVC Folder Structure to keep files organized

## UI

Created with Bulma
Bulma allows for a very responsive design out of the gate by using flexbox, along with some different keywords like hero, tiles, has, is, level, and more. Exaples of that would be
```
<div class="tile is-parent margin-left">
       <article class="tile is-child box">
       <p class="title">Blog/Comments</p>
       <p class="subtitle">Aligned with the right column</p>
       <nav class="level">
       <div class="level-left">
       <div class="level-item">
      <a class="button is-info">Submit</a>
```
	



### APIs

Spotify API used for image, artist name, and id which is used to identify artist to display artist's songs on the spotify player. 
```
 spotify
    .search({ type: "artist", query: req.body.artist, limit: 3 })
    .then(function(response) {
      var artistName = response.artists.items[0].name;
      var artistGenres = response.artists.items[0].genres;
      var imageUrl = response.artists.items[0].images[0].url;
      var artistID = response.artists.items[0].id;
```

Node-Spotify is used to pull the information in the backend, which is pushed to the frontend and appended onto the page to display the requested information. 
The Spotify keys are hidden through .env and added to heroku to be able to deploy it without compromising the keys.

### Database/ MySQL

Database used to allow users to leave comments and rating about their favorite artists on the searched artist page.
The user is prompted to fill out their name, rating, and comment/blog entry. The table has another column with the artist name that is populated with artist name from the html page, which gets it from the spotify search after the user searches for that artist. This allows the comments to be displayed on the same page as that specific artist instead of having the all the comments displayed on a separate page.

	```
	var routeName = $(".title").attr("value")

	artist: routeName
	
	app.get("/blog/:artistName", function(req, res) {
    Blog.findAll({
      where: {
        artist: req.params.artistName
      }
    })
	```
### Passport/ Passport-Spotify

Passport allows users to authenticate themselves on the website.  This can be done locally or with a 3rd party website such as Google, Spotify, Facebook, etc.  The ability to login helps users store their data in a profile.  In this case, we are able to access information from Spotify to display to the users on the website.  

```
  app.get('/auth/spotify', passport.authenticate('spotify', {
    scope: ['user-read-email']
}
  // The request will be redirected to spotify for authentication, so this
  // function will not be called.
));
  // app.get('/auth/spotify', passport.authenticate('spotify', {
  //     scope: ['user-read-email']
  // }
  //   // The request will be redirected to spotify for authentication, so this
  //   // function will not be called.
  // ));
  ```


### Future Development
<ul>
<li>Create Artist Page for local/unknown artists to be able to add profile pages about themselves</li>
<li>Create feature that displays new artists, where you can search by genre to find new music</li>
<li>Only allow Rating to be 1-5 stars - average rating displayed</li>
<li>Connect to BandsinTown API to display concert details for each artist/ Use an API to include brief bio about each artist</li>
<li>Local Users - Passport</li>
<li>Allow logged in users to add Favorites</li>
</ul>


# Credits

Jon Cheshire, Matt Maliaros, Olivia Kalinowski, Patrick Moroney, and Mackenzie Balisage
