const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username:{
        type:String ,
        required: true
    },
  content:{
    type:String ,
    required : true
  }
});

const User = mongoose.model("Post",postSchema);
module.exports = User;