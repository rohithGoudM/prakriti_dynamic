var express = require("express");
var router  = express.Router();
const passport = require('passport');
var User = require("../models/user-model");
var Customer = require("../models/customer-model");
var Restaurant = require("../models/restaurant-model");


// auth login
router.get('/login', (req, res) => {
	res.render('signIn');
});

router.post('/customer/signUp', (req, res)=>{
	var body = req.body,
		username = body.username,
		password = body.password,
		city = body.city,
		area = body.area,
		phoneNumber = body.phoneNumber,
		name = body.name;
	Customer.findOne({username: username}, function(err, doc){
		if(err){console.log(err);}
		else{
			Restaurant.findOne({username: username}, function(error, mur){
				if(error){console.log(error);}
				else{

			if(doc || mur){
				res.render('signUp',{err: 'Username already exists'});
			}else{
				var record = new Customer()
				record.username = username;
				record.password = record.hashPassword(password);
				record.name = name;
				record.city = city;
				record.area = area;
				record.phoneNumber = phoneNumber;
				record.top = 0;
				record.save(function(err, user){
					if(err){
						res.render('signUp',{err: 'DB error. Try Again'});
					}else{
						res.redirect('/profile/customer');
					}
				});
			}
				}
			});
		}
	});
});

router.post('/restaurant/signUp', (req, res)=>{
	var body = req.body,
		username = body.username,
		password = body.password,
		name = body.name,
		phoneNumber = body.phoneNumber,
		city = body.res_city,
		area = body.res_area;
	Customer.findOne({username: username}, function(err, doc){
		if(err){console.log(err);}
		else{
			Restaurant.findOne({username: username}, function(error, mur){
				if(error){console.log(error);}
				else{

			if(doc || mur){
				res.render('signUp',{err: 'Username already exists'});
			}else{
				var record = new Restaurant()
				record.username = username;
				record.password = record.hashPassword(password);
				record.name = name;
				record.phoneNumber = phoneNumber;
				record.city = city;
				record.area = area;
				record.save(function(err, user){
					if(err){
						res.render('signUp',{err: 'DB error. Try Again'});
					}else{
						res.redirect('/profile/restraunt');
					}
				});
			}
				}
			});
		}
	});
});

router.post('/login', passport.authenticate('local',{
	failureRedirect: '/login',
	successRedirect: '/profile'
}), function(req, res){
	res.send('hey there!!!');
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// auth with google
router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}),()=>{
	
	console.log('callback uri');
});

//callback route for g+ to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
	res.redirect('/profile');
});

// auth with facebook
router.get('/facebook', passport.authenticate('facebook', { 
	scope: 'email' 
}));

//callback route for fb to redirect
router.get('/facebook/redirect',
  passport.authenticate('facebook'), (req, res)=>{
  	res.redirect('/team');
  });

module.exports = router;