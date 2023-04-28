const mongoose = require("mongoose");
const { Schema } = mongoose;

const storySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: 0, // 0 : private , 1 : Public
  },
  story: {
    data: Buffer,
    contentType: String, // buffer stores data in binary so it can be image/video/audio etc
  },
});

module.exports = mongoose.model("Story", storySchema);
