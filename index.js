const express = require('express')
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
   uuid = require('uuid'),
  Models = require('./models.js'),
  app = express();

const Movies = Models.Movie;
const Users = Models.User;

app.use(bodyParser.json());

var auth = require('./auth')(app);
/* ^ Theis app argument ensures that Express is available in your auth.js file */
const passport = require('passport');
require('./passport');

mongoose.set('useFindAndModify', false);
// findOneAndUpdate depreciation override
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true
});

// GET all Movies
app.get('/movies', passport.authenticate('jwt', { session: false }), function(req,  res) {
  Movies.find(function(err, movie) {
    if (err) {
      console.error(err);
      res.status(500).send('Movies.find ' + err);
    } else {
      res.json(movie);
    }
  });
});

// Get movie by Title
app.get('/movies/:Title', passport.authenticate('jwt', {session : false}), function(req, res) {
  Movies.findOne({ Title: req.params.Title }, function(err, oneMovie) {
    if (err) {
      console.error(err);
      res.status(500).send('Movies.findOneError: ' + err);
    } else {
      res.json(oneMovie);
    }
  });
});

// GET data about a genre
app.get('/movies/Genre/:Name', passport.authenticate('jwt', {session : false}), function(req, res) {
  Movies.findOne({ 'Genre.Name': req.params.Name }, function(err, movies) {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(movies.Genre);
    }
  });
});

//GET data about a director
app.get('/movies/director/:Name', passport.authenticate('jwt', {session : false}), function(req, res) {
  Movies.findOne({ 'Director.Name': req.params.Name }, function(err, movies) {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(movies.Director);
    }
  });
});

// GET all users
app.get('/users', function(req, res) {
  Users.find()
    .then(function(users) {
      res.status(201).json(users);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send('THIS IS AN ERROR ' + err);
    });
});

// CREATE in Mongoose  - i.e. POST
app.post('/users',  function(req, res) {
  Users.findOne({ Username: req.body.Username })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
          Favorites: req.body.Favorites
        })
          .then(function(user) {
            res.status(201).json(user);
          })
          .catch(function(error) {
            console.error(error);
            res.status(500).send('Users.create ' + error);
          });
      }
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).semd('ErrorUsers.create.Catch: ' + error);
    });
});

// READ in Mongoose to GET a  user by Username
app.get('/users/:Username', passport.authenticate('jwt', {session : false}), function(req, res) {
  Users.findOne({ Username: req.params.Username }, function(err, users) {
    if (err) {
      console.error(err);
      res.status(500).send('Users.findONeUsername: ' + err);
    } else {
      res.json(users);
    }
  });
});

// Update by Username
app.put('/users/:Username', passport.authenticate('jwt', {session : false}), function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    {
      new: true
    }, // ^The line above makes sure that the updated document is returned - not needed in READ
    function(err, updateUser) {
      if (err) {
        console.error(err);
        res.status(500).send('UpdateUserError: ' + err);
      } else {
        res.json(updateUser);
      }
    }
  );
});
// Add a movie to a users list of  favorites
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session : false}), function(req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send('Users.findOne: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Remove  a movie from favorites
app.delete('/users/:Username/:FavoriteMovies/:MovieID', passport.authenticate('jwt', {session : false}), function(req, res) {
  Users.findOneAndUpdate(
    { FavoriteMovies: req.params.MovieID },
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true },
    function(err, updatedFavorites) {
      if (err) {
        console.error(err);
        res.status(500).send('Users.findOneandUPdate ' + err);
      } else {
        res.json(updatedFavorites);
      }
    }
  );
});

// DELETE a user by Username
app.delete('/users/:Username', passport.authenticate('jwt', {session : false}), function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(function(user) {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send('Users.findOneAndRemove ' + err);
    });
});

// Listen for requests
app.listen(8080, () => console.log('Your app is listening on port 8080.'));
