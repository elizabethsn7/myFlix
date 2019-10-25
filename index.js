const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();
app.use(bodyParser.json());

<<<<<<< HEAD
let Movies = [{
    title: "Life is Beautiful",
    director: {
      name: "Roberto Benigni",
      bio: "A true artist with the ability to showcase honest human emotion"
    },
    genre: "Drama",
    imgUrl: "images/lifeIsBeaut.jpg"
  },
  {
    title: "The Pirate Movie",
    director: {
      name: "Ken Annakin",
      bio: "He created this cult classic if you consider my sister and myself a cult."
    },
    genre: "Comedy",
    imgUrl: "images/thePirateMovie.jpg"
  },
  {
    title: "Steel Magnolia\'s",
    director: {
      name: "Herbert Ross",
      bio: "A male who is clearly in touch with female relationship dynamics"
    },
    genre: "Drama",
    imgUrl: "images/steelMagnolias.jpg"
  },
  {
    title: "Apocalypto",
    director: {
      name: "Mel Gibson",
      bio: "It eventually came out that this guy is a bigot but this movie is super cool."
    },
    genre: "Action",
    imgUrl: "images/apocalypto.jpg"
  },
  {
    title: "Moana",
    director: {
      name: "Ron Clements, John Musker",
      bio: "Created a movie with accurate dipictions of a Polynesian culture."
    },
    imgUrl: "images/moana.jpg",
=======
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
>>>>>>> bb7182b6d1f56bb58c2434f572f34b41d64438bf
    genre: "Animation"
  },
  {
    title: "One Crazy Summer",
<<<<<<< HEAD
    director: {
      name: "Savage Steve Holland",
      bio: "Made one of the most hilarious movies ever!"
    },
    genre: "Comedy",
    image: "images/oneCrazySummer.jpg"
  },
  {
    title: "Bohemian Rhapsody",
    director: {
      name: "Bryan Singer",
      bio: "His name says he picked the right movie to direct"
    },
    genre: "Biography",
    imgUrl: "images/bohemianRhapsody.jpg"
  },
  {
    title: "Hunt for the Wilderpeople",
    director: {
      name: "Taika Waititi",
      bio: "From New Zealand and has a cool name!"
    },
    genre: "Adventure",
    imgUrl: "images/huntForTheWilder.jpg"
  },
  {
    title: "A Star is born (2018)",
    director:  {
      name: "Bradly Cooper",
      bio: "A big giant superstar!"
    },
    genre: "Drama",
    imgUrl: "images/aStarIsBorn.jpg"
  },
  {
    title: "The Never Ending Story",
    director: {
      name: "Wolfgang Petersen",
      bio: "A creative genious"
    },
    genre: "Adventure",
    imgUrl: "images/theNeverEndingStory.jpg"
  }
]

let Users = [ {
  name: "",
  username: "",
  email: "",
  favorites: ""
}];

=======
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

>>>>>>> bb7182b6d1f56bb58c2434f572f34b41d64438bf
// GET data to list All movies
app.get("/movies", (req, res) => {
  res.json(Movies);
});
<<<<<<< HEAD

=======
>>>>>>> bb7182b6d1f56bb58c2434f572f34b41d64438bf
// GET data about a single movie by title
app.get("/movies/:title", (req, res) => {
  res.json(Movies.find((movie) => {
    return movie.title === req.params.title
  }));
});
<<<<<<< HEAD

// GET data about genre by title
app.get("/title/:genre", (req, res) => {
  res.json(Movies.find((movie) => {
    res.send('These are genre\'s');
=======
// GET data about genre by title
app.get("/movies/:title/:genre", (req, res) => {
  res.json(Movies.find((movie) => {
>>>>>>> bb7182b6d1f56bb58c2434f572f34b41d64438bf
      return movie.genre === req.params.genre
  }));
});

// GET data about a specific movies director
<<<<<<< HEAD
app.get("/director/:name", (req, res) => {
  res.json(Movies.find((movie) => {
    res.send("I am a director of a movie!");
    return movie.director === req.params.director;
  }));
});

// POST -Allow a new user to register
app.post("/users", (req, res) => {
  let newUser = req.body;
  if(!newUser.name) {
    const message = 'Missing "name" in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    Users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Update user info
app.put("/users/:name/:username/:email/favorites", (req, res) => {
  res.send('Got a put request at /users');
});

// POST - Add a movie to favorites
app.post("/users/:name/:username/:email/favorites", (req, res) => {
  let newFavorite = req.body;
  if (!newFavorite.favorites) {
    const message = 'List your favorite, fool!';
    res.status(400).send(message);
  } else {
    newFavorite.id = uuid.v4();
    Users.push(newFavorite);
    res.status(201).send(newFavorite);
  }
});

// DELETE - Remove a movie from favorites
app.delete("/users/:favorites/title", (req, res) => {
  res.send('I have deleted one of my favorites.');
});

//DELETE - deregister a user
app.delete("/users/:name/:username/:email/:favorites", (req, res) => {
  res.send('I have deregistered a user.');
});
=======
app.get("/movies/:title/:director", (req, res) => {
  res.json(Movies.find((movie) => {
    return movie.director === req.params.director
  }))

});
// POST -Allow a new user to register



>>>>>>> bb7182b6d1f56bb58c2434f572f34b41d64438bf
// Listen for requests
app.listen(8080, () =>
  console.log("Your app is listening on port 8080.")
);
