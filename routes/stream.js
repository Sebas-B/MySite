var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
   res.render('stream', {title:'vimeo stream'});
 });

module.exports = router;
