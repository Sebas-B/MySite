/*  Nombre del autor: Sebastian Eduardo Ramirez Bocanegra
           Objetivo de archivo: obtener la pagina acercade y poder mostrarla
       Fecha y hora: 29/10/2020 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
   res.render('acercade', {title:'Acerca de'});
 });

module.exports = router;
