var express = require('express');
var router = express.Router();
var service = require('../service.js');

/* GET fetch data for each metric */

// registration
router.get('/rr.json', service.getRRData);

router.get('/traffic.json', service.getRRData);

router.get('/performance/webapp-perf.json', service.getRRData);

router.get('/yahoo-api.json', service.getYahooData);


module.exports = router;