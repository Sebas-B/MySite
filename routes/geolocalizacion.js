var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
   res.render('geolocalizacion', {title:'Geolocalizacion leaflet'});
 });

module.exports = router;

