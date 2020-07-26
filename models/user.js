var mongoose 	=require("mongoose");
var passportLocalMongoose			=require("passport-local-mongoose");

var UserSchema=new mongoose.Schema({
	username: String,
	password: String
});

UserSchema.plugin(passportLocalMongoose);  //so that req.user is defined 

module.exports=mongoose.model("User",UserSchema);