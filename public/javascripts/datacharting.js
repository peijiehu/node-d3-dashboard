// var d3 = require("d3");

// var data = [4, 8, 15, 16, 23, 42];

// var x = d3.scale.linear()
//     .domain([0, d3.max(data)])
//     .range([0, 420]);

// d3.select(".chart")
//   .selectAll("div")
//     .data(data)
//   .enter().append("div")
//     .style("width", function(d) { return x(d) + "px"; })
//     .text(function(d) { return d; });

$(function(){
  $('#search').on('keyup', function(e){
	  if(e.keyCode === 13) {
	    var parameters = { search: $(this).val() };
	    $.get('/searching', parameters, function(data) {
	      $('#results').html(data);
	      // process data here?
	    });
  	};
  });
});

// todo 
// have multiple divs with id ready in index.jade
// create corresponding ajax calls in here
// each ajax call should have parameter defined in the call, no user input needed
// should trigger when this js gets load, no user action needed
// send data back, process later, may need require js to require d3.js in here