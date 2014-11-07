var express = require('express');
var router = express.Router();
var service = require('../service.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!!!!!!' })
});


router.get('/api', service.yahooData);

router.get('/searching', service.searchJob);

// router.get('/api', function(req, res) {
// 	service.googleData(req, res);
// });

module.exports = router;
