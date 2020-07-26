var express=require("express");
var router =express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware = require("../middleware");

//============================================
// INDEX => display all campgrounds from DB 
//============================================
router.get("/campgrounds",function(req,res){
	
	Campground.find({},function(err,obj1){
		if(err)
		console.log(err);
	else{
		console.log("success")
		res.render("campgrounds/index",{obj:obj1});
		}
	})
});
//=================================
//CREATE =>POST a new data to DB
//=================================
router.post("/campgrounds",middleware.isLoggedIn, function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var prize=req.body.prize;
	var disc=req.body.discription;
	var loc=req.body.location;
	var author={
		id: req.user._id,
		username: req.user.username
	};
	var Cam={name: name,image: image ,prize:prize ,discription: disc,location: loc,author: author};
	Campground.create(Cam, function(err,objbody){
	if(err)
		console.log(err);
	else{
		console.log("success")
		console.log(objbody);   
		res.redirect("/campgrounds");	
	}
});
});
//==================================================
// NEW => Display a Form to enter a new campground
//==================================================
router.get("/campgrounds/new",middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});

//================================================
//SHOW => To get data of a perticular Campground
//================================================
router.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundid){ //.populate("comments").exec(---)dereference comment from ObjectId
		if(err || !foundid){
			console.log(err);
		 req.flash('error', 'Sorry, that campground does not exist!');
            return res.redirect('/campgrounds');
		}else{
			res.render("campgrounds/show",{obj:foundid});	
		}
	})
})
//========================================
//EDIT => To edit a specific campground
//========================================
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id,function(err,camp){
		// if(err){
		// 	res.redirect("/campground");
		// }else{
			res.render("campgrounds/edit",{camp:req.campground});
		// }
	})
});
//========================================
//UPDATE => To Update a specific campground
//========================================
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.newcamp ,function(err,camp){
		// if(err){
		// 	res.redirect("/campgrounds");
		// }else{
			res.redirect("/campgrounds/"+req.params.id);
		// }
	})
});
//========================================
//DELETE => To delete a specific campground
//========================================
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err,camp){
		// if(err){
		// 	res.redirect("/campgrounds");
		// }else{
		Comment.deleteMany( {_id: { $in: camp.comments } }, (err) => {
            if (err) {
                console.log(err);
            }
			req.flash("success","Campground Deleted Successfully!")
            return res.redirect("/campgrounds");
        });
		// }
	})
});

module.exports=router;