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

/* POST */
router.get('/response-chart', function(req, res) {
    res.render('response-chart', { title: req.body.yahoo_location })
});

module.exports = router;
