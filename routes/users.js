var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/signin', function(req, res) {
res.render('signin');
      });

router.get('/signup', function(req, res) {
  res.render('signup');
    });

router.post('/signup', function(req, res) {
  const {name, email, pass, pass_c} = req.body;
  let errors = [];

  console.log(req.body)

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
    res.redirect('/')
  }

  });

module.exports = router;



