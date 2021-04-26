const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const UserSchema = require('./user')

const MovieSchema = new Schema({
  name: {
    type: String
  },
  year: {
    type: Number
  },
  metacritic_rating: {
    type: String
  },
  rotten_tomatoes_rating: {
    type: String
  },
  imdb_rating: {
    type: Number
  },
  votes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('Movie', MovieSchema);
