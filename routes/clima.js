var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
   res.render('clima', {title:'Acerca de'});
 });

module.exports = router;
