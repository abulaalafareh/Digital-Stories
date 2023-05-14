const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
  body: {
    type: String,
  },
  username: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
