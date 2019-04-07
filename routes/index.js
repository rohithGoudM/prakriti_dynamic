var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user-model");
var Team = require("../models/team-model");
var Upcoming_event = require("../models/upcoming_event-model");
var Event = require("../models/event-model");
var Project = require("../models/project-model");

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
  var today = new Date();
  today.setDate(today.getDate()+0);
  cutoff.setDate(cutoff.getDate()+10);
  Upcoming_event.find({date: { "$lt": cutoff, "$gt": today}},function(err, up_events){
    Event.find({},function(error, events){
      Project.find({},function(errorror, projects){      
        res.render('index',{up_events: up_events, events: events, projects: projects});
      });
    });
  });
});

router.get("/event/:event_name/", function(req, res){  
  var today = new Date();
  today.setDate(today.getDate()+0);
  Event.findOne({name: req.params.event_name}, function(err, event){
    Upcoming_event.find({ name: req.params.event_name, date: { "$lt": today}},
    ['name', 'picUrl', 'date','picUrl1','picUrl2','picUrl3','fblink'],
    {
      skip:0,
      sort:{
        date: -1
      }
    },
    function(error, events){
      res.render("event", {event: event, events: events});
    });
  });
});

router.get("/login", (req, res)=>{
  res.render("signIn");
});

router.get("/signup", (req, res)=>{
  res.render("signUp");
});

module.exports = router;