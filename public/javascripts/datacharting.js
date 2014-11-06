var service = require('../service.js');
var d3 = require("d3");

var data = [4, 8, 15, 16, 23, 42];

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; });

service.yahooData("Sunny Vale, CA", "json", function(body) {
    document.write("not working");
});

function getRawData(){
	document.write("does it even get to the function?");
    service.yahooData("Sunny Vale, CA", "json", function(body) {
    	document.write("can you write?");
	    document.write(body);
    });
}