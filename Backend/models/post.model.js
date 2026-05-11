const mongoose = require('mongoose');

// Schema for blog type posts : only messages

const postSchema = new mongoose.Schema({

    message:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    time : {
        type : Date,
        default : Date.now
    }
},{timestamp : true});

module.exports = mongoose.model('Post', postSchema);