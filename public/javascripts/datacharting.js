
$(function(){ // dom ready, everything in here runs immediatelly after dom ready

    $('#search').on('keyup', function(e){
        if(e.keyCode === 13) {
		    var parameters = { search: $(this).val() };
		    $.get('/searching', parameters, function(data) {
		        $('#results').html(data);
		    });
	    };
    });

    getAllData(); // functionName() parentheses means execute

    setInterval(getAllData, 120000); // no parentheses should be appended to functionName when it's inside a parentheses

    d3.select(".chart").append("p").text("Hello D3!");

});


function getAllData() {
    /* AJAX call here. */
    $.get('/getdata-1', function(data) {
	    $('#chart-1').html(data+Date());
	});
	$.get('/getdata-2', function(data) {
	    $('#chart-2').html(data+Date());
	});
}