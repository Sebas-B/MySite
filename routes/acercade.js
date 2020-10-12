var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
   res.render('acercade', {title:'Acerca de'});
 });

module.exports = router;
