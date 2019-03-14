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

const authCheck = (req, res, next)=>{
	if(req.user){
		//logged in
		// console.log('logged in');
		next();
	}else{
		//not logged in
		// console.log('not logged in');
		console.log(req);
		res.redirect('/');
	}
};

router.get('/admin',authCheck,function(req,res){
	res.render('admin/profile');
});




module.exports = router;