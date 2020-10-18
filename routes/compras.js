var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
   res.render('compras', {title:'Music is life!!!'});
 });

module.exports = router;
