var express = require('express');
var router = express.Router();

const User = require('../model/User');
const passport = require('passport');

/* GET users listing. */
router.get('/signin', (req, res) => {
res.render('signin');
      });

router.get('/signup', function(req, res) {
  res.render('signup');
    });

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'signin',
  failureFlash: false
}));


/*
router.post("/signin", function(req, res, next) {
 var user = new User({
 email: req.body.email,
 pass: req.body.pass
 });

User.findById(req.body.email, (err, user) => {
if (err) res.status(400).send(err);
 res.status(200).send(user);
 });
});
*/

router.post('/signup', async (req, res) => {
  const {name, email, pass, pass_c} = req.body;
  const errors = [];

  if(name.length <= 0) {
   errors.push({text: 'Por favor introducir su nombre'});
  }

  if(pass != pass_c) {
  errors.push({text: 'Las contraseñas no coinciden'});
  }

  if(pass.length < 4) {
  errors.push({text: 'La contraseña debe tener al menos 4 caracteres'});
  }

  if(errors.length > 0) {
  res.render('signup',  {errors, name, email, pass, pass_c});

  } else {
    const emailUser = await User.findOne({email: email});
    if(emailUser) {
	req.flash('error_msg', 'El email ya esta registrado');
	res.redirect('/users/signup');
	}

      const newUser = new User({name, email, pass});
      newUser.pass = await newUser.encryptPassword(pass);
      await newUser.save();
      req.flash('success_msg', 'Bienvenido al lado oscruro');
      res.redirect('/users/signin');
  }

  });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;



