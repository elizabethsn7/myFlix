const path = require("path");
require("dotenv").config();
const express = require("express");
(bodyParser = require("body-parser")),
  (morgan = require("morgan")),
  (mongoose = require("mongoose")),
  (uuid = require("uuid")),
  (Models = require("./models.js")),
  (passport = require("passport")),
  (cors = require("cors")),
  ({ check, validationResult } = require("express-validator"));
require("./passport");

const Movies = Models.Movie;
const Users = Models.User;

// mongoose.connect('mongodb://localhost:27017/myFlixDB', {
//   useNewUrlParser: true
// });

mongoose.connect(
  "mongodb+srv://LizIsAdmin:wedidit@cluster0-lbz0j.mongodb.net/myFlixDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

const app = express();

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(express.static("public"));
// app.use("/client", express.static(path.join(__dirname, "client", "dist")));
// app.get("/client/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });
app.use(cors());
const auth = require("./auth")(app);

//Error handling middleware functions
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
  next();
});

// CREATE in Mongoose  - i.e. POST
app.post(
  "/users",
  [
    (check("Username", "Username is required  minimum 5 characters").isLength({
      min: 5
    }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail())
  ],
  (req, res) => {
    // check the validation of object for errors
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({
      Username: req.body.Username
    })
      .then(function(user) {
        if (user) {
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
            Favorites: req.body.Favorites
          })
            .then(function(user) {
              res.status(201).json(user);
            })
            .catch(function(error) {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Users.create.catch Error: " + error);
      });
  }
);

// Update by Username
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  [
    check("Username", "Username is required minimum 5 characters").isLength({
      min: 5
    }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required")
      .not()
      .isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ],
  (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
      {
        Username: req.params.Username
      },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      {
        new: true
      },
      // new: true makes sure that the updated document is returned - not needed in READ
      function(err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// GET all users
app.get("/users", function(req, res) {
  Users.find()
    .then(function(users) {
      res.status(201).json(users);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("THIS IS AN ERROR " + err);
    });
});

// READ in Mongoose to GET a  user by Username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", {
    session: false
  }),
  function(req, res) {
    Users.findOne(
      {
        Username: req.params.Username
      },
      function(err, users) {
        if (err) {
          console.error(err);
          res.status(500).send("Username: " + err);
        } else {
          res.json(users);
        }
      }
    );
  }
);

// Add a movie to a users list of  favorites
app.post(
  "/users/:Username/Movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Users.findOneAndUpdate(
      {
        Username: req.params.Username
      },
      {
        $push: {
          FavoriteMovies: req.params.MovieID
        }
      },
      {
        new: true
      },
      function(err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Users.findOne: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Remove  a movie from favorites
app.delete(
  "/users/:Username/:FavoriteMovies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Users.findOneAndUpdate(
      {
        FavoriteMovies: req.params.MovieID
      },
      {
        $pull: {
          FavoriteMovies: req.params.MovieID
        }
      },
      {
        new: true
      },
      function(err, updatedFavorites) {
        if (err) {
          console.error(err);
          res.status(500).send("Users.findOneandUPdate " + err);
        } else {
          res.json(updatedFavorites);
        }
      }
    );
  }
);

// DELETE a user by Username
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Users.findOneAndRemove({
      Username: req.params.Username
    })
      .then(function(user) {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send("Users.findOneAndRemove " + err);
      });
  }
);

// GET all Movies
app.get("/movies", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Movies.find(function(err, movie) {
    if (err) {
      console.error(err);
      res.status(500).send("Movies.find " + err);
    } else {
      res.json(movie);
    }
  });
});

// Get movie by Title
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne(
      {
        Title: req.params.Title
      },
      function(err, oneMovie) {
        if (err) {
          console.error(err);
          res.status(500).send("Movies.findOneError: " + err);
        } else {
          res.json(oneMovie);
        }
      }
    );
  }
);

// GET data about a genre
app.get(
  "/movies/Genre/:Name",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne(
      {
        "Genre.Name": req.params.Name
      },
      function(err, movies) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(movies.Genre);
        }
      }
    );
  }
);

//GET data about a director
app.get(
  "/movies/director/:Name",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne(
      {
        "Director.Name": req.params.Name
      },
      function(err, movies) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(movies.Director);
        }
      }
    );
  }
);

//GET data about a movie's Image
app.get("/movies/ImagePath/:Name", function(req, res) {
  Movies.findOne(
    {
      "ImagePath.Name": req.params.Name
    },
    function(err, movies) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(movies.ImagePath);
      }
    }
  );
});

// Listen for requests
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});
