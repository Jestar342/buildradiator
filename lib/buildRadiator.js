var _ = require('underscore');

var jobFailed = function(job) { 
	return job.status == 'fail'; 
};

var flattenJob = function(job) {
	var flattened = _({}).extend(job, job.$);
	return _(flattened).omit('$');
}

var flattenBuild = function(build) {
	var flattened = _({}).extend(build, build.$);
	flattened.job = flattened.job.map(flattenJob);
	return _(flattened).omit('$');
}

exports.extendBuild = function(build) {
	var extension = {};

	build = flattenBuild(build);

	Object.defineProperty(extension, 'status', {
		enumerable: true,
		get: function() { 
			return _(build.job).some(jobFailed) ? 'fail' : 'pass';
		}
	});

	Object.defineProperty(extension, 'failed', {
		enumerable: true,
		get: function() { return this.status == 'fail'; }
	});

	return _({}).extend(build, extension);
};