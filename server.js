const express = require("express"),
    app = express(),
    port = process.env.PORT || 3005;
app.listen(port, () => {
 console.log("Movie Night API started on port " + port);
});

// Info of the movie night
app.get('/info')

// Status of the API
app.get('/status')

// CRUD Movie Night
app.route('/movienights')

// Make a call to the imdb api
app.get('/movieinfo/:movieName')

app.post('/create')
app.post('/join')
app.post('/delete')
app.post('/start')
app.post('/nominate')
app.post('/vote')
app.post('/settings')
app.post('/invite')
app.post('/kick')
app.post('/ban')
app.post('/mod')
