const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');


router.post('/signup',async (req,res)=>{

    try{

        const{name : userName, email : userEmail, password : password} = req.body;

        if(!userName || !userEmail || !password){
            return res.json({
                success : false,
                message : "All fields are required"
            })
        }

        // Have set email as unique so can be used to finc specific user

        const Exists = await User.findOne({email : userEmail});

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

        // user create karte hi main feed pe jayega isliye yaha jwt sign krdenge.. so that next time directly a jaye.
        
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200)
                    .json({
                        success : true,
                        message : "User created SuccessFully",
                        token,
                        user: {
                            name: user.name,
                            email: user.email
                        }
                    })
        
    }
    catch(err){

        return res.status(400)
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
            return res.status(400)
                        .json({
                            message : "All fields are required"
                        })
        }

        const user = await User.findOne({email : userEmail});

        if(!user){
            return res.status(404).json({
                message : "no user found with this mail"
            });
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400)
                        .json({
                            message : "Incorrect password"
                        })
        }

        //  if everything is good, jwt token generate krna hai.. that will be used for future verification

        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200)
                    .json({
                        success: true,
                        message : "Login successful",
                        token,
                        user : {
                            name : user.name,
                            email : user.email
                        }
                    })

    }
    catch(err){

        return res.status(400)
                    .json({
                        success : false,
                        error : err.message
                    })
    }

})


module.exports = router;