var _ = require('underscore');
var fs = require('fs');
var xml2js = require('xml2js');
var buildRadiator = require('../lib/buildRadiator.js');

exports.readData = function(callback) {
	fs.readFile('build.xml', function(error, data) {
		xml2js.parseString(data, function(error, json) {
			var builds = _(json.builds.build).map(buildRadiator.extendBuild);
			callback(builds);
		});
	});
};

exports.getData = function(request, response) {
	exports.readData(function(data) {
		response.send(data);
	});
};