//gather data for api call
var callData = {
		apiKey: "bc3155c676bb49f2891e0ed3857fd36a",
		$searchTerm: "",
		$numRecs: 0,
		$sYear: 0,
		$eYear: 0,
		qURL: ""	
}

//starts with a click...
$('#execSearch').on('click',function(){
	$("#articleResults").empty();
	event.preventDefault();
	//get user values
	callData.$searchTerm = $('#searchTerm').val(),
	callData.$numRecs = $('#numRecSelect').val(),
	callData.$sYear = $('#sYear').val(),
	callData.$eYear = $('#eYear').val()

	//setdefaults for optional parameters
	if (typeof callData.$sYear === 'undefined' || callData.$sYear === null || callData.$sYear === ""){
		callData.$sYear = 1900
	};

	if (typeof callData.$eYear === 'undefined' || callData.$eYear === null || callData.$eYear === ""){
		callData.$eYear = 2900
	};	

	//so, how'd it go?
	// console.log(callData.$searchTerm);
	// console.log(callData.$numRecs);
	// console.log(callData.$sYear);
	// console.log(callData.$eYear);

	callData.qURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + callData.apiKey 
		+ '&q=' + callData.$searchTerm 
		+ '&begin_date=' + callData.$sYear + '0101' 
		+ '&end_date=' + callData.$eYear + '0101'
	
	// console.log(callData.qURL);

// 	//now that you have what you need, run the call...
apiCall(callData.$searchTerm, callData.$sYear, callData.eYear);
 });

//create api call
var apiCall = function(searchTerm, sYear, eYear) {
	$.ajax({
		url: callData.qURL,
		method: "GET"
	}).done(function(response){
		for (var i = 1; i <= callData.$numRecs; i++) {

			var $ar = $('<div class="articleResult well well-sm">');
			$ar.attr('id', 'articleResult-' + i);
			$('#articleResults').append($ar);

			var $aData = $('#articleResult-' + i);
			var $rd = response.response.docs[i]

			if ($rd.headline.main === "null"){
				$aData.append('<h3><span class="label label-primary">'
					+ "Headline Not Available</strong></h3>")
			}else{
				$aData.append('<h3><span class="label label-primary">' + i 
				+ '</span><strong>   ' 
				+ $rd.headline.main 
				+ "</strong></h3>")
			}

			if($rd.byline === null){				
				$aData.append('<h5>Author Not Available</h5>')				
			}else{
				$aData.append('<h5>' + $rd.byline.original + "</h5>");
			}

			if($rd.section_name === null){
				$aData.append('<h5>Section Not Available </h5>');
			}else{
				$aData.append('<h5>Section: ' + $rd.section_name + "</h5>");
			}

			$aData.append('<h5>' + moment($rd.pub_date).format('MMMM Do YYYY') + "</h5>");
			$aData.append("<a href='" + $rd.web_url + "'>" + $rd.web_url + "</a>");

		}
	// console.log(response)
	});
}

//
$('#clearResults').on('click', function(){
	articleCounter = 0;
	$("#articleResults").empty();
})
