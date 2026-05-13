const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({

  image: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    required: true,
    trim: true
  },

  author : {
    type: String,
    required: true
  },

  time : {
    type : Date,
    default : Date.now
  }
}, { timestamps: true });

const Image = mongoose.model('image', imageSchema);

module.exports = Image;