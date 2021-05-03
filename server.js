require('dotenv').config();

const express = require("express"),
  app = express(),
  port = process.env.PORT || 3005;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MovieNightModel = require('./api/models/user');
const MovieModel = require('./api/models/movie');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// app.listen(port, () => {
//  console.log("Movie Night API started on port " + port);
// });


// const MovieModel = mongoose.model('Movie', MovieSchema);
// const MovieNightModel = mongoose.model('MovieNight', MovieNightSchema);


// Info of the movie night
// app.get('/info')

// Status of the API
// app.get('/status')

// CRUD Movie Night
// app.route('/movienights')

// Make a call to the imdb api
// app.get('/movieinfo/:movieName')

// app.post('/create')
// app.post('/join')
// app.post('/delete')
// app.post('/start')
// app.post('/nominate')
// app.post('/vote')
// app.post('/settings')
// app.post('/invite')
// app.post('/kick')
// app.post('/ban')
// app.post('/mod')
//
movieRouter = express.Router();
movieNightRouter = express.Router();
//
// // at this layer, we can add our logic to verify valid api call
// // ex. uses a session token, or has a certain payload property
movieRouter.use(function moviePrep(req, res, next) {
  next();
});

movieNightRouter.use(function movieNightPrep(req, res, next) {
  next();
});


app.get('/api/movies/:id', (req, res) => {
  try {
    const query = MovieModel.findOne({ _id: req.params.id });
    query.then(doc => res.send(doc));
    // return res.send(movie);
  }
  catch (err) {
    console.log(err);
    res.status(400).send('movie not found');
  }
});

app.post('/api/movies', (req, res) => {
  try {
    // Before adding the movie, search it in omdb and get some stats for seeding
    const omdbResults = await fetch('http://www.omdbapi.com/?apikey=' + process.env.OMDB_API_KEY + '&t=' + req.body.name);
    omdbResults = await omdbResults.json();
    // Map ratings
    const ratings = omdbResults.Ratings.reduce((ratingMap, rating) => {
      ratingMap[rating.Source] = rating.value;
      return ratingMap;
    });
    const movie = {
      name: omdbResults.Title,
      year: omdbResults.Year,
      metacritic_rating: ratings['Metacritic'],
      rotten_tomatoes_rating: ratings['Rotten Tomatoes'],
      imdb_rating: ratings['Internet Movie Database'],
      votes: null
    }
    // add new movie to movies
    const query = MovieModel.findOneAndUpdate({ _id: req.body.id }, movie, { new: true, upsert: true });
    query.then(doc => res.status(201).send(doc));
    // add the movie to a movie night
  }
  catch (err) {
    console.log(err);
    res.status(400).send('movie not created');
  }
});


app.get('/api/movieNights/:id', (req, res) => {
  // find a movie night
  movieNight = MovieNightModel.findOne(req.params.id);
  return res.send({ 'movieNight': movieNight });
});

app.post('/api/movieNights', (req, res) => {
  //create a movie night
  MovieNightModel.save(req.body.movieNight);
  return res.send({ 'movieNight': req.body.movieNight });
});

module.exports = app;

// movieNightRouter.post('/api/movieNights/:id', (req, res) =>{
//   if (req.body.movie.hasOwnProperty(req.params.id)){
//     // append the id as a field if it doesn't exist
//     req.body.movie[id] = req.params.id;
//   }
//   //update a movie night
//   MovieNightModel.save(req.body.movie);
// });
