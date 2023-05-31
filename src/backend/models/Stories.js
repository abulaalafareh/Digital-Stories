const mongoose = require("mongoose");
const { Schema } = mongoose;

const storySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false, // false : private , true : Public
  },
  multimedia: {
    data: Buffer,
    contentType: String, // buffer stores data in binary so it can be image/video/audio etc
  },
  text: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  background_color: {
    type: String,
    default: null,
  },
  font: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Story", storySchema);
