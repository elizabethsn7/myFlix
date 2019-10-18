const express = require('express');
const app = express();

// Using the Express routing syntax discussed earlier in the Exercise, create an Express GET route located at the endpoint “/movies” that returns a JSON object containing data about your top 10 movies.

let topMovies = [ {
  title: 'Life is Beautiful',
  staring: 'Roberto Benibgni & Nicoletta Braschi'
},
{ title: 'The Pirate Movie',
staring: 'Christopher Atkins & Kristy McNichol'
},
{ title: 'Steel Magnolia\'s',
staring: 'Sally Field, Dolly Parton, Shirley  MacLaine, Daryl Hannah, 	Olympia Dukakis & Julia Roberts'
}]
// GET requests
app.get('/', function(req, res) {
  res.send('Welcome to my movie club!')
});
app.get('documentation', function(req, res) {
  res.sendFile('public/documentation.html', {root : __dirname});
});
app.get('/movies', function(req, res) {
  res.json(topMovies)
});

// Listen for requests
app.listen(8080, () =>
console.log('Your app is lestening on port 8080.')
);
