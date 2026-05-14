const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');
const verifyUser = require('../middleware/auth');
const upload = require("../middleware/upload");
const { uploadImage } = require('../services/storage.service');
const Images = require('../models/image.model');


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


// new image type of posts

router.post("/upload", verifyUser ,upload.single('image'), async (req,res)=>{

    if(!req.file){
        return res.status(400)
                    .json({
                        success : false,
                        message : "No file uploaded"
                    })
    }

    try{

        const imageUrl = await uploadImage(req.file.buffer, req.file.originalname);
        const{caption} = req.body;

        const Image = new Images({
            image : imageUrl,
            caption : caption,
            author  : req.user.name,
            time : Date.now()
        });

        await Image.save();

        return res.status(200)
                    .json({
                        success : true,
                        message : "Image uploaded successfully",
                        Image,
                        imageUrl
                    });
    }
    catch(err){
        res.json({success:false, message: "post not created" + err.message});
    }
    

});

    

router.post("/myposts", verifyUser, async (req,res)=>{ // only shows post created by current user : in profile page

    try{

        const author = req.user.name; // from token

        const posts = await Post.find({author});
        const images = await Images.find({author});

        const allPosts = [...posts, ...images];

        res.json({
            success : true,
            posts: allPosts
        });
    }
    catch(err){
        res.json({success:false, message: "post not found", err });
    }

});

router.get("/feed", verifyUser, async (req,res)=>{ // global feed any verified user can see 

    try{

        const posts = await Post.find();
        const images = await Images.find();

        const allPosts = [...posts, ...images];

        return res.json({
            success : true,
            posts: allPosts
        });

    }
    catch{
        res.status(404)
            .json({success:false, message: "post not found"});
    }
});



router.delete("/delete/:id", verifyUser, async (req,res)=>{

    try{

        let id = req.params.id; 
    
        let deletedPost = await Post.findOneAndDelete({ // find the post by id and delete it.
            _id : id
        });

        if (!deletedPost) {
            deletedPost = await Images.findOneAndDelete({
                _id: id
            });
        }
        
        if(!deletedPost){
            return res.status(404)
                        .json({
                            success : false,
                            message : "post not found"
                        })
        }

        return res.status(200)
                    .json({
                        success : true,
                        message : "post deleted successfully"
                    })
    }
    catch(err){
        res.status(400)
            .json({
                success : false,
                message : err.message
            });

    }

} );

module.exports = router;

