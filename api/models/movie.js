'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: {
    type: String,
  },
  imdb_rating: {
    type: Number
  },
  rotten_tomatoes_rating: {
    type: Number
  },
  votes: [UserSchema],
});

module.exports = mongoose.model('Movie', MovieSchema);