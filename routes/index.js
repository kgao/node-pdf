var express = require('express');
var router = express.Router();
var pdfController = require('../controllers/pdfController');
var cableController = require('../controllers/cableController');
var Answer = require('../models/Answer');
var answerController = require('../controllers/answerController');



var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));
 
  // router.post('/login',
  // passport.authenticate('login'),
  // function(req, res) {
  //   // If this function gets called, authentication was successful.
  //   // `req.user` contains the authenticated user.
  //   res.redirect('/home' + req.user.username);
  // });


	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
    
    /* Handle App Logic */
	router.get('/cable', isAuthenticated, function(req, res){
		cableController.findCableByIndex(req.query.id,function(o){
			if(o.status === 404){
				res.render('home', {user: req.user, error: true});
			}else{
				pdfController.loadPDF(o.content[0].PDFLink, function(e){
					res.render('cable1', { title: 'Cable', e: e, user: req.user, id: req.query.id, cable: o.content[0] });
				});
			}
		});
	});
	router.post('/cable', isAuthenticated, function(req, res){
		console.log('Submitting Answer ... ');
        var answer = new Answer({
            UserName: req.body.UserName,
            Index: req.body.id,
            DocID: req.body.DocID,
            PFRUS: req.body.PFRUS,
            InFRUS: req.body.InFRUS,
            SICResult: req.body.SICResult,
            PDFLink: req.body.PDFLink,
            Year: req.body.Year,
            Answer_FRUS_Rate: req.body.FRUS_Rate,
            Answer_FRUS_Features: req.body.FRUS_Features,
            Answer_FRUS_Note: req.body.FRUS_Note
        });         
       answerController.findAnswerAndUpsert(answer, function(a){
		   if(a.status === 404){
					res.render('cable1', { title: 'Cable', e: {status:404, content:[]}, user: req.user, id: req.body.id, cable:{}, error: true});
		   }else{
			   //Start next experiment automatically ->
			   cableController.findCableByIndex( a.content.Index+1, function(o){
					if(o.status === 404){
						res.render('home', {user: req.user, error: true});
					}else{
						pdfController.loadPDF(o.content[0].PDFLink, function(e){
							res.render('cable1', { title: 'Cable', e: e, user: req.user, id: a.content.Index+1, cable: o.content[0] });
						});
					}
			  });
		   }
		});
	});


	return router;
}




