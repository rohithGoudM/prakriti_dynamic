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
var Upcoming_event = require("../models/upcoming_event-model");

const authCheck = (req, res, next)=>{
	if(req.user){
		//logged in
		// console.log('logged in');
		next();
	}else{
		//not logged in
		// console.log('not logged in');
		res.redirect('/');
	}
};

router.get('/admin',authCheck,function(req,res){
  var today = new Date();
  today.setDate(today.getDate()+0);
	Upcoming_event.find({date: { "$lt": today}},function(err, upevents){
		res.render('admin/profile',{events: upevents});
	});
});




module.exports = router;