var express 	 	=require("express");
var app			 	=express();
var bodyparser		=require("body-parser");  // use 'body' as an obect that takes content from FORM in POST req
var mongoose	 	=require("mongoose"); 
var flash			=require("connect-flash");
var passport	 	=require("passport");
var LocalStrategy	=require("passport-local");
var methodOverride	=require("method-override");
var Campground  	=require("./models/campground");
var Comment			=require("./models/comment");
var User			= require("./models/user");
var seedDB      	=require("./seeds");
//============================================================
var campgroundRoutes =require("./routes/campgrounds");
var commentRoutes	 =require("./routes/comments");
var indexRoutes		 =require("./routes/index");
//============================================================

//========================
//Connection to MongoDB
//========================
// mongoose.connect('mongodb://localhost:27017/yelp_camp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
mongoose.connect('mongodb+srv://amanakrai:aman123rai@cluster0.ll2jn.mongodb.net/MyYelpCamp?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});



app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");	// no need to write .ejs
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); 
//seeding campgrounds and comments
//=====================
//Passport Config
//=====================
app.use(require("express-session")({
	secret: "this is my first node project!",
	resave: false,
	saveUninitialize: false
}));
app.use(passport.initialize());                   		 	//INITIALIZE PASSPORT 
app.use(passport.session());								//SESSION STABLISHED VIA A COKKIE 	
passport.use(new LocalStrategy(User.authenticate()));		//STRATEGIES FOR USER AUTH
passport.serializeUser(User.serializeUser());				// USER AS A WHOLE OBJ
passport.deserializeUser(User.deserializeUser());			// USER AS A PERTICULAR OBJ FIELD EG ID

//====================
//FUNCTION FOR PASSING USER TO EVERY FUCNTION ARG : User defined middleware
//====================
app.use(function(req,res,next){
	res.locals.currentUser= req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});
//=====================
//Using Routes
//=====================
app.use(indexRoutes);
app.use(campgroundRoutes); 
app.use(commentRoutes);



app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});