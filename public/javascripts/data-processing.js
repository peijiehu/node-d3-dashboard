// execute scripts for home page
$(function(){
	if ($("body.index").length > 0) {
		showAllData();
		setInterval(showAllData, 60000);
	}
});

// show charts for all data
function showAllData() {
    oneCall('/rr');
    oneCall('/traffic');
}

// kpi/rr
$(function(){
	if ($("body.rr").length > 0) {
		oneCall('/rr');
		setInterval( 
			function(){
				oneCall('/rr');
			}, 
			60000 
		);
	}
});

// traffic
$(function(){
	if ($("body.traffic").length > 0) {
		oneCall('/traffic');
		setInterval( 
			function(){
				oneCall('/traffic');
			}, 
			60000 
		);
	}
});

// define size parameters for all charts that are created below
var margin = {top: 20, right: 40, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    textFont = "14px",
    parsedTextFont = parseFloat(textFont),
	parseDate = d3.time.format("%d-%b-%y").parse,
    formatDate = d3.time.format("%d-%b"),
    bisectDate = d3.bisector(function(d) { return d.date; }).left;

/**
 * all in one ajax call
 * call all functions that create charts
 * @param  {String} dataRoute
 * @return {null}
 */
function oneCall(dataRoute) {
	// corresponding to route defined in data-routes.js
	$.get(dataRoute + '.json', function(json_data) {
		// using fake dataset in the functions below until we have real data from backend
		// real dataset should contain at least two pairs of key value pair, one for date, one for value
		// real dataset can also contain optional third and fourth element in each hash
		// chart
		drawBarChart("dataset", dataRoute);
		drawLineChart("dataset", dataRoute);
		drawPieChart("dataset", dataRoute);

		// table
		var thead = d3.select("table").select("thead").selectAll("th")
	                  .data(d3.keys(json_data))
	                  .enter().append("th").text(function(d){return d;});
	    var td = d3.select("tr").selectAll("td")
	               .data(d3.values(json_data))
	               .enter().append("td")
	               .text(function(d){return d;});
	});
	// Show system time upon completion of chart
    $("#timestamp_last_generated").html("Last generated at " + new Date());
}


// todo total value = value1 + value2 + ... +valueN, N = Object.keys(dataset[0]).length;
function drawPieChart(dataset, dataRoute) {
	var dataset = [ 
				{ date: "1-May-12", value: 5, value_desktop: 3, value_mobile: 2 },
				{ date: "2-May-12", value: 10, value_desktop: 5, value_mobile: 5 },
				{ date: "3-May-12", value: 13, value_desktop: 7, value_mobile: 6 },
				{ date: "4-May-12", value: 19, value_desktop: 9, value_mobile: 10 },
				{ date: "5-May-12", value: 21, value_desktop: 12, value_mobile: 9 },
				{ date: "6-May-12", value: 25, value_desktop: 15, value_mobile: 10 },
				{ date: "7-May-12", value: 22, value_desktop: 11, value_mobile: 11 },
				{ date: "8-May-12", value: 18, value_desktop: 10, value_mobile: 8 },
				{ date: "9-May-12", value: 15, value_desktop: 7, value_mobile: 8 },
				{ date: "10-May-12", value: 13, value_desktop: 7, value_mobile: 6 },
				{ date: "11-May-12", value: 11, value_desktop: 5, value_mobile: 6 },
				{ date: "12-May-12", value: 12, value_desktop: 5, value_mobile: 7 },
				{ date: "13-May-12", value: 15, value_desktop: 7, value_mobile: 8 },
				{ date: "14-May-12", value: 20, value_desktop: 11, value_mobile: 9 },
				{ date: "15-May-12", value: 18, value_desktop: 10, value_mobile: 8 }];
	var w = 450;
	var h = 300;
	var outerRadius = 100;
	var innerRadius = 45;

	var fromDate = dataset[0].date,
		toDate = dataset[dataset.length-1].date;
	// sum of value_desktop and sum of value_mobile for certain period of time
	var sum_value_desktop = totalValue(dataset, "value_desktop"),
		sum_value_mobile = totalValue(dataset, "value_mobile"),
		sum_sum = sum_value_desktop + sum_value_mobile;
    // array data d3 pie can use
    var arrayData = [sum_value_desktop, sum_value_mobile];
    // To store the name for the data, to be used for label
    var hashData = {Desktop: sum_value_desktop, Mobile: sum_value_mobile};

	//D3 helper function to populate pie slice parameters from array data
	var pie = d3.layout.pie();
	var pieData = pie(arrayData);

	//D3 helper function to create colors from an ordinal scale
	var color = d3.scale.category20();

    d3.select(".pie-chart")
      .select("svg")
      .remove();
    // create svg
	var svg = d3.select(".pie-chart").append("svg:svg")
	  .attr("width", w)
	  .attr("height", h)
	  .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

	// Set up arc
	var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

	//Set up arcs group, pass data in
	var arcs = svg.selectAll("g.arc")
		        .data(pieData)
		        .enter()
		        .append("g")
		        .attr("class", "arc")
                .attr("transform", "translate(" + (w/2) + ", " + (h/2) + ")");

	//Draw arc paths
	arcs.append("path")
	    .attr("fill", function(d, i) {
	        return color(i);
	    })
	    .attr("d", arc);

	//GROUP FOR LABELS
	var label_group = arcs.append("text")
	      .attr("transform", function(d) {
	          return "translate(" + arc.centroid(d) + ")";
	      })
		  .attr("class", "label")
	      .attr("text-anchor", "middle")
		  .text(function(d) {
		  	return d.value;
		  });
    arcs.append("text")
	      .attr("transform", function(d) {
	          return "translate(" + arc.centroid(d) + ")";
	      })
		  .attr("class", "label")
	      .attr("text-anchor", "middle")
		  .attr("dy", -parsedTextFont-1)
		  .text(function(d) {
		  	return (_.invert(hashData))[d.value]; // 'underscore' function to retrieve key by value
		  });

	//GROUP FOR CENTER TEXT  
	var center_group = svg.append("svg:g")
	  .attr("class", "center_group")
	  .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");
	// "TOTAL" LABEL
	center_group.append("svg:text")
			  .attr("class", "label")
			  .attr("dy", -parsedTextFont)
			  .attr("text-anchor", "middle")
			  .text("TOTAL");
	center_group.append("svg:text")
			  .attr("class", "label")
			  .attr("dy", parsedTextFont)
			  .attr("text-anchor", "middle")
		      .text(sum_sum);
    // Show time period for pie chart data
    svg.append("svg:g")
       .attr("class", "time_period_group")
   	   .attr("transform", "translate(" + (w/2) + "," + (h-parsedTextFont) + ")")
   	   .append("svg:text")
	   .attr("text-anchor", "middle")
	   .text("Pie chart data: from " + fromDate + " to " + toDate);
}

// todo total value = value1 + value2 + ... +valueN, N = Object.keys(dataset[0]).length;
function drawStackedBarChart(dataset, dataRoute) {
	// use this fake dataset, until we are really getting updated dataset from backend
	var dataset = [ 
					{ date: "1-May-12", value: 5, value_desktop: 3, value_mobile: 2 },
					{ date: "2-May-12", value: 10, value_desktop: 5, value_mobile: 5 },
					{ date: "3-May-12", value: 13, value_desktop: 7, value_mobile: 6 },
					{ date: "4-May-12", value: 19, value_desktop: 9, value_mobile: 10 },
					{ date: "5-May-12", value: 21, value_desktop: 12, value_mobile: 9 },
					{ date: "6-May-12", value: 25, value_desktop: 15, value_mobile: 10 },
					{ date: "7-May-12", value: 22, value_desktop: 11, value_mobile: 11 },
					{ date: "8-May-12", value: 18, value_desktop: 10, value_mobile: 8 },
					{ date: "9-May-12", value: 15, value_desktop: 7, value_mobile: 8 },
					{ date: "10-May-12", value: 13, value_desktop: 7, value_mobile: 6 },
					{ date: "11-May-12", value: 11, value_desktop: 5, value_mobile: 6 },
					{ date: "12-May-12", value: 12, value_desktop: 5, value_mobile: 7 },
					{ date: "13-May-12", value: 15, value_desktop: 7, value_mobile: 8 },
					{ date: "14-May-12", value: 20, value_desktop: 11, value_mobile: 9 },
					{ date: "15-May-12", value: 18, value_desktop: 10, value_mobile: 8 }];
	var pairsCount = Object.keys(dataset[0]).length;
}

function drawBarChart(dataset, dataRoute) {
	// use this fake dataset, until we are really getting updated dataset from backend
	var dataset = [ 
					{ date: "1-May-12", value: 5, value_desktop: 3, value_mobile: 2 },
					{ date: "2-May-12", value: 10, value_desktop: 5, value_mobile: 5 },
					{ date: "3-May-12", value: 13, value_desktop: 7, value_mobile: 6 },
					{ date: "4-May-12", value: 19, value_desktop: 9, value_mobile: 10 },
					{ date: "5-May-12", value: 21, value_desktop: 12, value_mobile: 9 },
					{ date: "6-May-12", value: 25, value_desktop: 15, value_mobile: 10 },
					{ date: "7-May-12", value: 22, value_desktop: 11, value_mobile: 11 },
					{ date: "8-May-12", value: 18, value_desktop: 10, value_mobile: 8 },
					{ date: "9-May-12", value: 15, value_desktop: 7, value_mobile: 8 },
					{ date: "10-May-12", value: 13, value_desktop: 7, value_mobile: 6 },
					{ date: "11-May-12", value: 11, value_desktop: 5, value_mobile: 6 },
					{ date: "12-May-12", value: 12, value_desktop: 5, value_mobile: 7 },
					{ date: "13-May-12", value: 15, value_desktop: 7, value_mobile: 8 },
					{ date: "14-May-12", value: 20, value_desktop: 11, value_mobile: 9 },
					{ date: "15-May-12", value: 18, value_desktop: 10, value_mobile: 8 }];
	var xScale = d3.scale.ordinal()
					.domain(d3.range(dataset.length))
					.rangeRoundBands([0, width], 0.1); 

	var yScale = d3.scale.linear()
					.domain([0, d3.max(dataset, function(d) {return d.value;})])
					.range([0, height]);

	var xAxis = d3.svg.axis()
	              .scale(xScale)
	              .orient("bottom");

	var yAxis = d3.svg.axis()
	 			  .scale(yScale)
	 			  .orient("left");

	var key = function(d) {
		return d.date;
	};

    // the div will be selected and assigned to chartDiv if it exists
    // if this div doesn't exist on web page(html/jade), will NOT generate the chart
	var chartDiv = d3.select("[data-source-type='"+dataRoute+"']").select(".bar-chart");
    // remove existing svg if there's one
    chartDiv.select("svg").remove();
    // create new svg
    var chartId = "bar-chart-"+dataRoute;
  	var svg = chartDiv.append("svg")
  					  .attr("id", chartId)
					  .attr("width", width + margin.left + margin.right)
					  .attr("height", height + margin.top + margin.bottom)
					  .append("g")
					  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
  		.call(xAxis);

    svg.append("g")
         .attr("class", "y axis")
         .call(yAxis); 

	//Create bars
	svg.selectAll("bar")
	   .data(dataset, key)
	   .enter()
	   .append("rect")
	   .attr("class", "bar")
	   .attr("x", function(d, i) {
			return xScale(i);
	   })
	   .attr("y", function(d) {
			return height - yScale(d.value);
	   })
	   .attr("width", xScale.rangeBand())
	   .attr("height", function(d) {
			return yScale(d.value);
	   })
	   //Tooltip
	   .on("mouseover", function(d) {
	   	    //Get this bar's x/y values, then offset by svg's position
			var xPosition = parseFloat(d3.select(this).attr("x")) + document.getElementById(chartId).offsetLeft;
			var yPosition = parseFloat(d3.select(this).attr("y")) + document.getElementById(chartId).offsetTop;
			// create tooltip
		    tooltipDiv = d3.select(".tooltip-div")
		       .style("left", xPosition+"px")
		       .style("top", yPosition+"px")
		       .style("opacity", ".8");
		    tooltipDiv.select(".tooltip-text")
					  .text(d.date);
  		    tooltipDiv.select(".tooltip-text") // TODO need to change new line for value
  		              .append("span")
					  .text(d.value);
	   })
	   .on("mouseout", function() {
	   	    d3.select(".tooltip-div").style("opacity", "0");
	   });

	chartDiv.select(".summary")
			.select("p")
		    .text(dataRoute + " total value "+totalValue(dataset, "value")); 
}

function drawLineChart(dataset, dataRoute) {
	// use this fake dataset, until we are really getting updated dataset from backend
	var dataset = [ 
					{ date: "1-May-12", value: 5 },
					{ date: "2-May-12", value: 10 },
					{ date: "3-May-12", value: 13 },
					{ date: "4-May-12", value: 19 },
					{ date: "5-May-12", value: 21 },
					{ date: "6-May-12", value: 25 },
					{ date: "7-May-12", value: 22 },
					{ date: "8-May-12", value: 18 },
					{ date: "9-May-12", value: 15 },
					{ date: "10-May-12", value: 13 },
					{ date: "11-May-12", value: 11 },
					{ date: "12-May-12", value: 12 },
					{ date: "13-May-12", value: 15 },
					{ date: "14-May-12", value: 20 },
					{ date: "15-May-12", value: 18 }];

	dataset.forEach(function(d) {
	    d.date = parseDate(d.date);
	});

	var x = d3.time.scale()
	               .domain(d3.extent(dataset, function(d) { return d.date; }))
	               .range([0, width]);

	var y = d3.scale.linear()
	               .domain(d3.extent(dataset, function(d) { return d.value; }))
				   .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var line = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.value); });

    // the div will be selected and assigned to chartDiv if it exists
    // if this div doesn't exist on web page(html/jade), will NOT generate the chart
	var chartDiv = d3.select("[data-source-type='"+dataRoute+"']").select(".line-chart");

    // remove existing svg if there's one
    chartDiv.select("svg").remove();

    // create new svg
	var svg = chartDiv.append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			    .append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("y axis");

	svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", line);

    /**
     * Create tooltips which show and hide with mouse movement in the chart
     */
    // invisible area to append circle
	var focus = svg.append("g")                             
				   .style("display", "none");                                 
    
   // append the x line
    focus.append("line")
        .attr("class", "x")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", height);

    // append the y line
    focus.append("line")
        .attr("class", "y")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("x1", width)
        .attr("x2", width);

    // append the circle at the intersection
    focus.append("circle")
        .attr("class", "y")
        .style("fill", "none")
        .style("stroke", "blue")
        .attr("r", 4);

    // place the value at the intersection
    focus.append("text")
        .attr("class", "y1")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "-.3em");
    focus.append("text")
        .attr("class", "y2")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // place the date at the intersection
    focus.append("text")
        .attr("class", "y3")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "1em");
    focus.append("text")
        .attr("class", "y4")
        .attr("dx", 8)
        .attr("dy", "1em");
    
    // append the rectangle to capture mouse
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
		var x0 = x.invert(d3.mouse(this)[0]),
		    i = bisectDate(dataset, x0, 1),
		    d0 = dataset[i - 1],
		    d1 = dataset[i],
		    d = x0 - d0.date > d1.date - x0 ? d1 : d0;

		focus.select("circle.y")
		    .attr("transform",
		          "translate(" + x(d.date) + "," +
		                         y(d.value) + ")");

		focus.select("text.y1")
		    .attr("transform",
		          "translate(" + x(d.date) + "," +
		                         y(d.value) + ")")
		    .text(d.value);

		focus.select("text.y2")
		    .attr("transform",
		          "translate(" + x(d.date) + "," +
		                         y(d.value) + ")")
		    .text(d.value);

		focus.select("text.y3")
		    .attr("transform",
		          "translate(" + x(d.date) + "," +
		                         y(d.value) + ")")
		    .text(formatDate(d.date));

		focus.select("text.y4")
		    .attr("transform",
		          "translate(" + x(d.date) + "," +
		                         y(d.value) + ")")
		    .text(formatDate(d.date));

		focus.select(".x")
		    .attr("transform",
		          "translate(" + x(d.date) + "," +
		                         y(d.value) + ")")
		               .attr("y2", height - y(d.value));

		focus.select(".y")
		    .attr("transform",
		          "translate(" + width * -1 + "," +
		                         y(d.value) + ")")
		               .attr("x2", width + width);
	}

	chartDiv.select(".summary")
			.select("p")
		    .text(dataRoute + " total value "+totalValue(dataset, "value"));  
}

/* Helper functions */

// return sum of values from a dataset
function totalValue(dataset, key) {
	var total = 0;
	dataset.forEach(function(d) {
		total += d[key];
	});
	return total;
}