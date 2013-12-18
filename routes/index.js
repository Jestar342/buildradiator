exports.index = function(request, response) {
	require('./data').readData(function(data) {
		response.render('buildRadiator', { builds: data });			
	});
};