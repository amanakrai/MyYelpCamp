var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err||!foundCampground){
			   console.log(err);
			   req.flash("error","Sorry, that campground does not exist!");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)) {
                 req.campground = foundCampground;
				next();
            } else {
				req.flash("error","You are not Authorized to do that");
                res.redirect("back");
            }
           }
        });
    } else {
		req.flash("error","You need to Login first to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err||!foundComment){
			   console.log(err);
			   req.flash("error","Sorry, that comment does not exist!");
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                req.comment = foundComment;
				next();
            } else {
				req.flash("error","You are not Authorized to do that");
                res.redirect('/campgrounds/' + req.params.id);
            }
           }
        });
    } else {
		req.flash("error","You need to Login first to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error","Pls Login First")
    return res.redirect("/login");
}

module.exports = middlewareObj;