const mongoose = require('mongoose');
const { Schema } = mongoose;

const storySchema = new Schema({
  title: {
    type : String,
    required : true,
  },
  body: {
    type : String,
  },
  status: {
    type : Boolean,
    default : 0 // 0 : private , 1 : Public
  },
  story: {
    data : Buffer,   // buffer stores data in binary so it can be image/video/audio etc
    required : true,
  },
})

module.exports = mongoose.model('story',storySchema);