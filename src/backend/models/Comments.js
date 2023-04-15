const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  body: {
    type : String,
  },
  createdAt: {
    type: Date,
    default : Date.now
  }
})

module.exports = mongoose.model('story',commentSchema);