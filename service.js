var request = require("request");
var logger = require("./utils/logger");

module.exports.getRRData = function (req, res) {
    var url = "http://finance.yahoo.com/webservice/v1/symbols/aapl/quote?format=json";
    logger.debug("Making request to "+url);
    request(url, function (error, response, body) {
        logger.debug("Response statusCode: "+response.statusCode);
        if (!error && response.statusCode === 200) {
            fields = JSON.parse(body);
            res_data = fields.list.resources[0].resource.fields;
            res.send(res_data);
        }
    });
}

module.exports.getTrafficData = function (req, res) {
    var url = "http://finance.yahoo.com/webservice/v1/symbols/aapl/quote?format=json";
    logger.debug("Making request to "+url);
    request(url, function (error, response, body) {
    	logger.debug("Response statusCode: "+response.statusCode);
        if (!error && response.statusCode === 200) {
            fields = JSON.parse(body);
            res_data = fields.list.resources[0].resource.fields;
            res.send(res_data);
	    }
    });
}

var myUrl = "";
var myKey = "";
// options to be used by 'request', containing predefined keywords, eg. headers
var requestOptions = function(messageValue){
    return {
        headers: {
            'Content-Type': 'application/json',
            'APPLICATION_KEY': myKey
        },
        url: myUrl, // key can be either 'url' or 'uri'
        json: {'message': messageValue} // custom data needs to be passed in 'json: {key: value}'
    };
};

// functions to send request and get data by API
module.exports.getYahooData = function (req, res) {
    logger.debug("Making request to "+myUrl);
    // default method: 'GET'
    request(
        requestOptions('my msg 123'), 
        function (error, response, body) {
            logger.debug("Response statusCode: "+response.statusCode);
            if (!error && response.statusCode === 200) {
                res.send(body); // body is already json, eg. body.timestamp
            }
        }
    );
}