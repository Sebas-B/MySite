/*  Nombre del autor: Sebastian Eduardo Ramirez Bocanegra
           Objetivo de archivo: obtener la pagina compras y poder mostrarla
       Fecha y hora: 29/10/2020 */ 

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
   res.render('compras', {title:'Music is life!!!'});
 });

router.post('/compras#/checkout', function(req, res, next){
   const canciones =
  [
  {
  "id": "Dear_april",
  "price": 29.99,
  "url": "http://www.mediafire.com/file/geyff0yf0xa5870/Dear_April_%2528Side_A_-_Acoustic%2529.mp3/file"
  },
  {
  "id": "Jeans",
  "price": 19.99,
  "url": "http://www.mediafire.com/file/x7vxer9w2dj4zvm/AQUIHAYAQUIHAY_-_Jeans.mp3/file"
  },
  {
  "id": "american",
  "price": 39.99,
  "url": "http://www.mediafire.com/file/wbmu1t7g6hitkjb/Frank_Ocean_-_American_Wedding.mp3/file"
  },
  {
  "id": "Drama",
  "price": 15.99,
  "url": "http://www.mediafire.com/file/9909jvnpi99hkf9/C._Tangana_-_Drama.mp3/file"
  },
  {
  "id": "momma",
  "price": 59.99,
  "url": "http://www.mediafire.com/file/kj32kuxw969v3s1/momma.mp3/file"
  }
 ];

});

module.exports = router;
