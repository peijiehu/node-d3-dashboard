var request = require("request");
var logger = require("./utils/logger");

/**
 * Created by phu on 11/4/14.
 */
/* Call API to fetch data */


module.exports.yahooData = function (req, res) {
    query = req.query.yahoo_location;
    var url = "http://query.yahooapis.com/v1/public/yql?q=select * from geo.places where text=\""+query+"\"&format=json";

    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
	    }
    });
}

module.exports.googleData = function (req, res) {
    query = req.query.yahoo_location;
    var url = "http://query.yahooapis.com/v1/public/yql?q=select * from geo.places where text=\""+query+"\"&format=json";
// yahoo finance
// http://finance.yahoo.com/webservice/v1/symbols/aapl/quote?format=json
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
	    }
    });
}

module.exports.searchJob = function(req, res){
	// input value from search
	var val = req.query.search;
	// console.log(val);

	// url used to search yql
	var url = "http://query.yahooapis.com/v1/public/yql?q=select * from geo.places where text=\""+val+"\"&format=json";
	// console.log(url);

	// request module is used to process the yql url and return the results in JSON format
	request(url, function(err, resp, body) {
		body = JSON.parse(body); // this parse makes some values disappeared, and left "Object" as values
		// console.log(body.query.results);
		// logic used to compare search results with the input from user
		// console.log(!body.query.results.RDF.item['about'])
		if (!body.query.results) {
		  craig = "No results found. Try again.";
		} else {
			results = body.query.results.place[1].uri
	    craig = '<a href ="'+results+'">'+results+'</a>'
	  }
	  // pass back the results to client side
		res.send(craig);
	});
}

module.exports.getdata_1 = function (req, res) {
    var url = "http://finance.yahoo.com/webservice/v1/symbols/aapl/quote?format=json";
    logger.debug("Making request to "+url);
    request(url, function (error, response, body) {
    	logger.debug("Response statusCode: "+response.statusCode);
        if (!error && response.statusCode === 200) {
            res.send(body);
	    }
    });
}

module.exports.getdata_2 = function (req, res) {
    var url = "http://finance.yahoo.com/webservice/v1/symbols/tsla/quote?format=json";
    logger.debug("Making request to "+url);
    request(url, function (error, response, body) {
    	logger.debug("Response statusCode: "+response.statusCode);
        if (!error && response.statusCode === 200) {
            res.send(body);
	    }
    });
}