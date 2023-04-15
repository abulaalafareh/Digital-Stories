const mongoose = require('mongoose');
const { Schema } = mongoose;

const voteSchema = new Schema({
  vote: {
    type : Boolean,
  },
  createdAt: {
    type: Date,
    default : Date.now
  }
})

module.exports = mongoose.model('vote',voteSchema);