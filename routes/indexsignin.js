/*  Nombre del autor: Sebastian Eduardo Ramirez Bocanegra
           Objetivo de archivo: obtener la pagina index con inicio de sesion
           y poder mostrarla
       Fecha y hora: 29/10/2020 */			  
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('indexsignin', {page:'index'});
});

module.exports = router;
