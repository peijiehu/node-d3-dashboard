var request = require("request");

/**
 * Created by phu on 11/4/14.
 */
/* Call API to fetch data */
// query "Sunny Vale, CA"
// format "json"
function getDataFromYahoo(query, format) {
    format = format.toLowerCase();
    var url = "http://query.yahooapis.com/v1/public/yql?q=select * from geo.places where text=\""+query+"\"format="+format;

    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body) // Print the json response
            document.write(body);
        }
    });
}

//getDataFromYahoo("Sunny Value, CA", "json");