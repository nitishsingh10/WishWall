const mongoose = require('mongoose');

// useer schema : name, email and password

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    bio : {
        type: String,
        default : 'some bio'
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
        
    }
});

module.exports = mongoose.model('User', userSchema);
