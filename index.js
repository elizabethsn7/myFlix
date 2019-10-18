const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let topMovies = [ {
  title: 'Life is Beautiful',
  staring: 'Roberto Benibgni & Nicoletta Braschi'
},
{ title: 'The Pirate Movie',
staring: 'Christopher Atkins & Kristy McNichol'
},
{ title: 'Steel Magnolia\'s',
staring: 'Sally Field, Dolly Parton, Shirley  MacLaine, Daryl Hannah, 	Olympia Dukakis & Julia Roberts'
},
{ title: 'Apocolypto',
staring: 'Rudy Youngblood, Raoul Trujillo, Mayra Serbulo & Dalia Hernandez'
},
{ title: 'Moana',
staring: 'Auli\'i Cravalho Dwayne Johnson'
},
{ title: 'Alice in Wonderland',
staring: 'Kathryn Beaumont & Ed Wynn'
},
{title: 'Bohemiam Rhapsody',
staring: 'Rami Malek & Lucy Boynton'
},
{title: 'Hunt for the Wilderpeople',
staring: 'Julian Dennison, Sam Neill, & Rima Te Wiata'},
{title: 'A Star is born',
staring: 'Lady Gaga & Bradly Cooper'
},
{title: 'The Princess Bride',
staring: 'Billy Crystal, Robin Wright, & André the Giant'}
]
// GET requests
app.get('/movies', function(req, res) {
  res.json(topMovies)
});
app.get('/', function(req, res) {
  res.send('These are the few movies I\'ll watch more than once!')
});

app.use(express.static('public'));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something Broke!');
});

// Listen for requests
app.listen(8080, () =>
console.log('Your app is listening on port 8080.')
);
