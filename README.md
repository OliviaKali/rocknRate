# rocknRate

Music blog that provides users with a unique experience to search their favorite artists and be able to comment/rate them as well as listen to their songs through the spotify API and read some information about them all in the same place. Experience can be personalized by spotify authentication and logging into spotify.


Check out our website!
https://rocknrates.herokuapp.com


## Built with

Node, Express, MySQL, Spotify API, Sequelize, Bulma, Materialize, Passport, Spotify-Passport

## Code

MVC Folder Structure to keep files organized


### APIs

Spotify API used for image, artist name, and id which is used to identify artist to display artist's songs on the spotify player. Node-Spotify is used to pull the information in the backend, which is pushed to the frontend. 
Spotify key is hidden through .env and added to heroku to be able to deploy it without compromising the keys.

### Database/ MySQL

Database used to allow users to leave comments and rating about their favorite artists on the searched artist page.
The user is prompted to fill out their name, rating, and comment/blog entry. The table has another column with the artist name that is populated with artist name from the html page, which gets it from the spotify search after the user searches for that artist. This allows the comments to be displayed on the same page as the artist instead of having the all the comments displayed on one artist page.

	```var routeName = $(".title").attr("value")

	artist: routeName```

 ```app.get("/blog/:artistName", function(req, res) {
    Blog.findAll({
      where: {
        artist: req.params.artistName
      }
    })```

### Future Development
<ul>
<li>Create Artist Page for local/unknown artists to be able to add profile pages about themselves</li>
<li>Create feature that displays new artists, where you can search by genre to find new music</li>
<li>Only allow Rating to be 1-5 stars - average rating displayed</li>
<li>Connect to BandsinTown API to display concert details for each artist/ Use an API to include brief bio about each artist</li>
<li>Local Users - Passport</li>
<li>Allow logged in users to add Favorites</li>
<ul>

# Credits

Jon Cheshire, Matt Maliaros, Olivia Kalinowski, Patrick Moroney, and Mackenzie Balisage