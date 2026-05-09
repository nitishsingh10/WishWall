const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');
const { message } = require('statuses');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


router.post("/newpost",async (req,res)=>{

    try{
        const{message, author} = req.body

        const post = new Post({
            message,
            author,
            time : Date.now()
        });


        await post.save();

        res.json({
            success : true,
            message : "post created Successfully"
        });

    }
    catch{
        res.json({success:false, message: "post not created"});
    }
});

router.post("/myposts",async (req,res)=>{

    try{

        const{author} = req.body;

        const posts = await Post.find({author});
        
        res.json({
            success : true,
            posts
        });
    }
    catch{
        res.json({success:false, message: "post not found"});
    }

});

router.get("/feed",async (req,res)=>{

    try{

        const posts = await Post.find();
        res.json({
            success : true,
            posts
        });

    }
    catch{
        res.json({success:false, message: "post not found"});
    }
})

module.exports = router;

