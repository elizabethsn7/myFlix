const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();
app.use(bodyParser.json());

// let Users = [ {
//   name: "",
//   username: "",
//   email: "",
//   password: "",
//   dob: "",
//   favorites: ""
// }];

let Movies = [{
    title: "Life is Beautiful",
    director: "Roberto Benigni",
    genre: "Drama"
  },
  {
    title: "The Pirate Movie",
    director: "Ken Annakin",
    genre: "Comedy"
  },
  {
    title: "Steel Magnolia\'s",
    director: "Herbert Ross",
    genre: "Drama"
  },
  {
    title: "Apocalypto",
    director: "Mel Gibson",
    genre: "Action"
  },
  {
    title: "Moana",
    director: " Ron Clements, John Musker",
    genre: "Animation"
  },
  {
    title: "One Crazy Summer",
    director: "Savage Steve Holland",
    genre: "Comedy"
  },
  {
    title: "Bohemiam Rhapsody",
    director: "Bryan Singer",
    genre: "Biography"
  },
  {
    title: "Hunt for the Wilderpeople",
    director: "Taika Waititi",
    genre: "Adventure"
  },
  {
    title: "A Star is born (2018)",
    director: "Bradly Cooper",
    genre: "Drama"
  },
  {
    title: "The Never Ending Story",
    director: "Wolfgang Petersen",
    genre: "Adventure"
  }
]

// GET data to list All movies
app.get("/movies", (req, res) => {
  res.json(Movies);
});
// GET data about a single movie by title
app.get("/movies/:title", (req, res) => {
  res.json(Movies.find((movie) => {
    return movie.title === req.params.title
  }));
});
// GET data about genre by title
app.get("/movies/:title/:genre", (req, res) => {
  res.json(Movies.find((movie) => {
      return movie.genre === req.params.genre
  }));
});

// GET data about a specific movies director
app.get("/movies/:title/:director", (req, res) => {
  res.json(Movies.find((movie) => {
    return movie.director === req.params.director
  }))

});
// POST -Allow a new user to register



// Listen for requests
app.listen(8080, () =>
  console.log("Your app is listening on port 8080.")
);
