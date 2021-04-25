const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieNightSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the movie night'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: String
  },
  voting_info: {
    type: String
  },
  bracket: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  status: {
    type: String,
    enum: ['nominating', 'voting', 'watching', 'ended'],
    default: 'nominating'
  },
});

module.exports = mongoose.model('MovieNight', MovieNightSchema);
