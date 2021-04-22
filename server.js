const express = require("express"),
    app = express(),
    port = process.env.PORT || 3005;
app.listen(port, () => {
 console.log("Movie Night API started on port " + port);
});

const bodyParser = require('body-parser');
app.use(bodyParser);

const MovieModel = mongoose.model('Movie', mySchema);
const MovieNightModel = mongoose.model('MovieNight', mySchema);


// Info of the movie night
app.get('/info')

// Status of the API
app.get('/status')

// CRUD Movie Night
app.route('/movienights')

// Make a call to the imdb api
app.get('/movieinfo/:movieName')

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

movieRouter = express.Router()
movieNightRouter = express.Router()

// at this layer, we can add our logic to verify valid api call
// ex. uses a session token, or has a certain payload property
movieRouter.use(function moviePrep (req, res, next) {
  next()
});

movieNightRouter.use(function movieNightPrep (req, res, next) {
  next()
});


movieRouter.get('/movie/:id', (req, res) =>{
  MovieModel.findOne(req.params.id)
});
movieRouter.post('/movie', (req, res) =>{
  MovieModel.save(req.body)
});

movieNightRouter.get('/movie-night/:id', (req, res) =>{
  MovieNightModel.findOne(req.params.id)
});
movieNightRouter.post('/movie-night', (req, res) =>{
  MovieNightModel.save(req.body.)
});
