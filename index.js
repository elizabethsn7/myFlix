const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true
});

const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();
app.use(bodyParser.json());
// findOneAndUpdate depreciation override
// mongoose.set("useFindAndModify", false);

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

// CREATE in Mongoose  - i.e. POST
app.post("/users", function(req, res) {
  Users.findOne({
    Username: req.body.Username
  })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists");
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
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).semd("Error: " + error);
    });
});

// READ in Mongoose to GET a  user by username
app.get("/users/:Username", function(req, res) {
  Users.findOne(
    {
      Username: req.params.Username
    },
    function(err, users) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(users);
      }
    }
  );
});

// Update by Username
app.put("/users/:Username", function(req, res) {
  Users.findOneAndUpdate(
    {
      Username: req.params.Username
    },
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
        res.status(500).send("Error: " + err);
      } else {
        res.json(updateUser);
      }
    }
  );
});

// DELETE a user by username
app.delete("/users/:username", function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(function(user) {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Listen for requests
app.listen(8080, () => console.log("Your app is listening on port 8080."));
