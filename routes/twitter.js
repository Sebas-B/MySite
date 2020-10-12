var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
   res.render('twitter', {title:'Tweets que me gustaron'});
 });
module.exports = router;
