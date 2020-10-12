var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

//Metodo POST
router.post('/', function(req, res){
 res.send('Ando buscando un POST');
});

//Metodo PUT
router.put('/Soy', function(req, res) {
  res.send('Es es un saludo con gretting');
});

//Metodo Delete
router.delete('/hola', function(req, res) {
  res.send('Te delete de aqui bro');
});

module.exports = router;
