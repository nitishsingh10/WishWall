const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');
const verifyUser = require('../middleware/auth');


// new post 
router.post("/newpost", verifyUser ,async (req,res)=>{ // verifyUser :  middleware to check for the user and get the data of it

    try{
        const{message} = req.body
        const post = new Post({
            message,
            author : req.user.name, // from token
            time : Date.now()
        });

        await post.save();

        res.json({
            success : true,
            message : "post created Successfully",
            post : {
                author : post.author,
                message : post.message,
                time : post.time
            }
        });

    }
    catch{
        res.json({success:false, message: "post not created"});
    }
});

router.post("/myposts", verifyUser, async (req,res)=>{ // only shows post created by current user : in profile page

    try{

        const author = req.user.name; // from token

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

router.post("/feed", verifyUser, async (req,res)=>{ // global feed any verified user can see 

    try{

        const posts = await Post.find();
        return res.json({
            success : true,
            posts
        });

    }
    catch{
        res.json({success:false, message: "post not found"});
    }
})

module.exports = router;

