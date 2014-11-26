var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var page = 'index';
    res.render(page, { title: 'Dashboard', bodyClassVar: page });
});

/* GET RR metrics page. */
router.get('/rr', function(req, res) {
	var page = 'rr';
    res.render(page, { title: page, bodyClassVar: page });
});

/* GET traffic and visitor info page. */
router.get('/traffic', function(req, res) {
	var page = 'traffic';
    res.render(page, { title: page, bodyClassVar: page });
});

/* GET webapp performance metrics page. */
router.get('/performance/webapp', function(req, res) {
	var page = 'performance/webapp';
    res.render(page, { title: page, bodyClassVar: page });
});

/* GET signin page. */
router.get('/signin', function(req, res) {
	var page = 'signin';
    res.render(page, { title: page, bodyClassVar: page });
});

module.exports = router;