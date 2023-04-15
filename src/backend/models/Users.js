const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type : String,
    required : true,
  },
  username: {
    type : String,
    required : true,
    unique : true,
  },
  email: {
    type : String,
    required : true,
    unique : true
  },

  image:
  {
      data: Buffer
  },
  
  password: {
    type : String,
    required : true
  },
  date: {
    type : Date,
    default : Date.now 
  }
})
module.exports = mongoose.model('User',userSchema);