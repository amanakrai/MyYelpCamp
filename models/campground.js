var mongoose = require("mongoose");
 
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   prize: String,
   discription: String,
   location:String,
   author: {
		id:{
		 type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
		username: String
	},
   comments: [											// 1 campground can have more than 1 comment : ONE to MANY rel 
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Campground", campgroundSchema);