var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user-model");
var Team = require("../models/team-model");
var Event = require("../models/event-model");

const authCheck = (req, res, next)=>{
  if(req.user){
    //logged in
    next();
  }else{
    //not logged in
    res.redirect('/');
  }
};


//root route
router.get("/", function(req, res){
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate()+10);
  Event.find({date: { "$lt": cutoff}},function(err, events){
      res.render('index',{events: events});
    });
});

router.get("/login", (req, res)=>{
  res.render("signIn");
});

router.get("/signup", (req, res)=>{
  res.render("signUp");
});


module.exports = router;