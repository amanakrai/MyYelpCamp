var express=require("express");
var router =express.Router();
var Campground=require("../models/campground")
var Comment=require("../models/comment")
var middleware = require("../middleware");
//==================
//COMMENT ROUTES
//==================

//==================================================
// NEW => Display a Form to enter a new comment
//==================================================
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn ,function(req,res){ //isLoggedIn middleware checks if user is loggedin and then all next funts execs
	Campground.findById(req.params.id,function(err,body){
		if(err){
			console.log(err);
			
		}else{
			res.render("comments/new",{obj:body});
		}
	})
});
//=================================
//CREATE =>POST a new comment to DB
//=================================
router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
	 Campground.findById(req.params.id,function(err,campid){
		 if(err){
			 console.log(err);
		     res.redirect("/campgrounds")
		 }else{
			 Comment.create(req.body.coMMent,function(err,comment){
				  if(err){
			 	  console.log(err);
		 		}else{
				comment.author.id=req.user._id;
				comment.author.username=req.user.username;
				comment.save();
				
				campid.comments.push(comment);
				campid.save();
				req.flash("success","Comment Updated Successfully!");
				return res.redirect('/campgrounds/'+campid._id);
				}
			 })
		 }
	 })	
});
//========================================
//EDIT => To edit a specific comment
//========================================
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,comment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",{obj:req.params.id, comment:req.comment});
		}
	})
	
})


//========================================
//UPDATE => To Update a specific comment
//========================================
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.newcomment,function(err,body){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})

//========================================
//DELETE => To Delete a specific comment
//========================================
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err,body){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","Comment Deleted Successfully!");
			return res.redirect("/campgrounds/"+req.params.id);
		}
})
})
module.exports=router;