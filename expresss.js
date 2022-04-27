//npm init: is the first thing to do to create that package.json and OWN IT, THE WEBSITE!!

//npm install express --save  this is mostly done on the command line
//npm install _ _ _ _ _  --save : for other installation of the other packages
//you have to also know that it is important that THE NODE MODULES BE CHECKED 
//NODE MODULES: that is where the PACKAGES OR FRAMEWORKS ARE INSTALLED ON THE EDITOR


var express = require("express");
var app = express();

//  '/'  => 'hi there!'
app.get("/", function(req,res){
	res.send("Hi there");
});
//  "/bye" ==> "Goodbye"
app.get("/bye", function(req,res){
	res.send("Goodbye");
});
//  "/dog"  ==> "Meow"
app.get("/dog", function(req,res){
	console.log("SOMEONE MADE A GET REQUEST TO /DOG")
	res.send("Meow");
});

// the : colon denotes that ANY subredditName
app.get("/r/:subredditName", function(req,res){
	console.log(req);
	console.log(req.params);
	var subreddit = req.params.subredditname;
	res.send("WELCOME TO A" + subreddit.toUpperCase() + "SUBREDDIT!!");
});


// get more of the routing
app.get("/r/:subredditName/comments/:id/:title", function(req,res){
	res.send("WELCOME TO THE COMMENTS PAGE");
});



// for "*" for no error request: all
//route processes
app.get("*", function(req,res){
	res.send("YOU ARE MY STAR!!");
});





app.listen(3000, function(){
	console.log("THE SERVER HAS STARTED RUNNING ON PORT 3000!!!")
});