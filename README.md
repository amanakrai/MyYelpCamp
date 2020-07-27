# MyYelpCamp
>MyYelpCamp is a website where users can create and review campgrounds. In order to review or create a campground, you must LogIn/SignIn. 

This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.


## Live Demo

To see the app in action, go to  [MyYelpCamp](https://infinite-reaches-08131.herokuapp.com/)

## Features

* Authentication:
  
  * User login with username and password

* Authorization:

  * One cannot manage posts and view user profile without being authenticated

  * One cannot edit or delete posts and comments created by other users


* Manage campground posts with basic functionalities:

  * Create, edit and delete posts and comments

  * Upload campground photos
  
* Manage Comments and Ratings:

	* Add new Comment and Rating
	
	* Update your Comments or Ratings
	
    * Delete your Comment
	
* Manage New user account:

	* Sign-up page


* Flash messages responding to users' interaction with the app

* Responsive web design

* Update campground photos when editing campgrounds


 
## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Bootstrap](https://getbootstrap.com/docs/3.3.7/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

* [GoormIDE](https://ide.goorm.io/)
* [Heroku](https://www.heroku.com/)
