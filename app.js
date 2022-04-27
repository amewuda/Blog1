var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local")
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
mongoose.connect("mongodb://localhost/app_first");
var app = express();

app.use(require("express-session")({
    secret: "This is my secret",
    resave:false,
    saveUninitialized:false
}));

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var blogSchema = new mongoose.Schema({
    title: String,
    image:String,
    body: String,
    created: {type:Date, default:Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Blog app 1",
//     image: "image12.png",
//     body: " This is a blog post"
// });


app.get("/", function(req, res){
    res.render("heart");
});
app.get("/secret", function(req,res){
    res.render("secret");
});

// Auth Routes
//1. The sign up form
app.get("/register", function(req,res){
    res.render("register");
});
// Handling the sign up form
app.post("/register", function(req,res){
    User.register(new User({username:req.body.username}, req.body.password, function(err, user){
        if (err){
            console.log("err");
            return res.render("register");
        }
        passport.authenticate("local")(req,res, function(){
            res.redirect("secret");
        });
    }))
});

//BLOGS
app.get("/blogs", function(req,res){
    Blog.find({}, function(err, blogs){
        if (err){
            console.log("Error");
        } else {
            res.render("home", {blogs:blogs});

        }
    })
});

//CREATE NEW BLOG FORM
app.get("/new", function(req, res){
   res.render("new") ;
});

//CREATE BLOG
app.post("/blogs", function(req,res){
    Blog.create(req.body.blog, function(err, newBlog){
        if (err){
            res.render("new");
        } else{
            res.redirect("/blogs");
        }
    })
});

//THIS IS THE SHOW PAGE FOR EACH BLOG BY ID
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            res.redirect("/blogs");
        } else{
            res.render("show", {blog:foundBlog})
        }
    })
})
// EDIT ROUTE FORM
app.get("/blogs/:id/edit", function(req,res){
    res.render("edit");
});

//UPDATE ROUTE


app.listen(3000, function(){
    console.log("The server is running");
});