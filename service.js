var request = require("request");

/**
 * Created by phu on 11/4/14.
 */
/* Call API to fetch data */
// query "Sunny Vale, CA"
// format "json"
// module.exports.yahooData = function (query, format, callback) {
//     format = format.toLowerCase();
//     var url = "http://query.yahooapis.com/v1/public/yql?q=select * from geo.places where text=\""+query+"\"&format="+format;

//     request(url, function (error, response, body) {
//         if (!error && response.statusCode === 200) {
//             callback(body);
//         }
//     });
// }

module.exports.yahooData = function (req, res) {
    query = req.query.yahoo_location;
    var url = "http://query.yahooapis.com/v1/public/yql?q=select * from geo.places where text=\""+query+"\"&format=json";

    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
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
            console.log(body);
            res.send(body);
	    }
    });
}

module.exports.searchJob = function(req, res){

	// input value from search
	var val = req.query.search;
	// console.log(val);

	// url used to search yql
	// var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20craigslist.search" +
	// "%20where%20location%3D%22sfbay%22%20and%20type%3D%22jjj%22%20and%20query%3D%22" + val + "%22&format=" +
	// "json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
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

	// testing the route
	// res.send("WHEEE");

}