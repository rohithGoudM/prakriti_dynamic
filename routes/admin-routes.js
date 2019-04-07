var express = require("express");
var router  = express.Router();
const Skill = require('../models/skill-model')
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })
const mongoose = require('mongoose');
var User = require("../models/user-model");
var Team = require("../models/team-model");
var Customer = require("../models/customer-model");
var Restaurant = require("../models/restaurant-model");
var Menu_item = require("../models/menu-model");
var Admin = require("../models/admin-model");
var Upcoming_event = require("../models/upcoming_event-model");
var Event = require("../models/event-model");
var Project = require("../models/project-model");
var upload = multer({ dest: 'public/uploads/' });

const passport = require('passport');

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
  res.render("admin/adminsignin");

});

router.get("/signup", (req, res)=>{
  res.render("admin/adminsignup");
});


router.post("/signup",  function(req, res){
  if(req.body.adminCode == "peephole"){

  Admin.findOne({username: req.body.user_name}, function(err, doc){
    if(doc){
      res.redirect("/admin");
    }else{
      var record = new Admin()
      record.username = req.body.user_name;
      record.password = req.body.password;

      record.save(function(error, user){
        if(error){
          res.send('db error');
        }else{
        res.redirect('/profile/admin');
        }
      });
    }
  });
}else{
  res.redirect("/");
}
});



router.post('/signin', passport.authenticate('local',{
  failureRedirect: '/admin/failureRedirect',
  successRedirect: '/profile/admin'
}), function(req, res){
  res.send('hey there!!!');
});


router.get('/events',function(req, res){
  Event.find({},function(err, events){
    res.render('admin/events', {events: events});
  })
});

router.get('/projects',function(req, res){
  Project.find({},function(err, projects){
    res.render('admin/projects', {projects: projects});
  })
});

router.get('/upcoming_events',function(req, res){
  Upcoming_event.find({},function(err, upevents){
    res.render('admin/upcoming_events', {events: upevents});
  })
});

router.get('/delete_event/:event_name',function(req, res){
  Event.deleteOne({name: req.params.event_name}, function(err){
    if(err){
      console.log(err);
    }
    res.redirect('/admin/events');
  });
});

router.get('/delete_project/:event_name',function(req, res){
  Project.deleteOne({name: req.params.event_name}, function(err){
    if(err){
      console.log(err);
    }
    res.redirect('/admin/projects');
  });
});

router.get('/delete_upevent/:date',function(req, res){
  Upcoming_event.deleteOne({date: req.params.date}, function(err){
    if(err){
      console.log(err);
    }
    res.redirect('/admin/upcoming_events');
  });
});

router.post('/addupevent', upload.any(), (req, res)=>{

    req.files.forEach(function(file){
    var newEvent = {      
      name: req.body.event_name,
      picUrl: '/uploads/'+file.filename,
      date: req.body.date,
      writeup: req.body.writeup
    }
    new Upcoming_event(newEvent).save(function(err, evnt){
    });

    });
    res.redirect('/profile/admin');
});

router.post('/addevent', upload.any(), (req, res)=>{
    req.files.forEach(function(file){
    var newEvent = {      
      name: req.body.event_name,
      picUrl: '/uploads/'+file.filename,
      writeup: req.body.writeup
    }
    new Event(newEvent).save(function(err, evnt){
    });

    });
    res.redirect('/profile/admin');
});

router.post('/addproject', upload.any(), (req, res)=>{
    req.files.forEach(function(file){
    var newProject = {      
      name: req.body.event_name,
      picUrl: '/uploads/'+file.filename,
      writeup: req.body.writeup
    }
    new Project(newProject).save(function(err, evnt){
    });

    });
    res.redirect('/profile/admin');
});

router.post('/add_details/:date',upload.any(), function(req, res){
  Upcoming_event.findOne({date: req.params.date}, function(err, upevent){
    upevent.fblink = req.body.fblink;
    upevent.picUrl1 = '/uploads/'+req.files[0].filename;       
    upevent.picUrl2 = '/uploads/'+req.files[1].filename;       
    upevent.picUrl3 = '/uploads/'+req.files[2].filename;
    upevent.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }

    res.redirect('/profile/admin');  
    });       
  });

});

module.exports = router;