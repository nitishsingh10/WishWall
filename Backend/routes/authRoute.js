const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { message } = require('statuses');

router.post('/signup',async (req,res)=>{

    try{

        const{name : userName, email : userEmail, password : password} = req.body;

        if(!userName || !userEmail || !password){
            return res.json({
                success : false,
                message : "All fields are required"
            })
        }

        const Exists = await User.findOne({userEmail});

        if(Exists){
            return res.json({
                message : "User already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name : userName,
            email : userEmail,
            password : hashedPassword
        });

        return res.status(200)
        .json({
            success : true,
            message : "User created SuccessFully"
        })
        
    }
    catch{

        res.status(400)
        .json({
            success : false,
            error : err.message
        })
    }

});

router.post('/login',async (req,res)=>{

    try{

        const{email:userEmail , password : password} = req.body;

        if(!userEmail || !password){
            res.status(400)
                .json({
                    message : "All fields are required"
                })
        }

        const isThere = await User.findOne({email : userEmail});

        if(!isThere){
            return res.json({
                message : "no user found with this mail"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        let isMatch = await bcrypt.compare(password,hashedPassword);

        if(!isMatch){
            return res.status(400)
                .json({
                    message : "Incorrect password"
                })
        }

        return res.status(200)
                    .json({
                        message : "Login successful",
                        userData : {
                            name : isThere.name,
                            email : isThere.email
                        }
                    })

    }
    catch{
        res.status(400)
        .json({
            success : false,
            error : err.message
        })
    }

})


module.exports = router;