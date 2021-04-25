const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const UserSchema = require('./user')

const MovieSchema = new Schema({
  imdb_link: {
    type: String
  },
  rotten_tomatoes_link: {
    type: String
  },
  votes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('Movie', MovieSchema);
