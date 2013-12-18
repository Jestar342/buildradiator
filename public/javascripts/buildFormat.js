var buildToListItem = function(build) {
	var listItem = $('<li></li>');
	listItem.text(build.name);
	listItem
	.addClass('build')
	.addClass(build.status);

	if (build.failed) {		
		var jobList = $('<ul></ul>');
		$(build.job).each(function(index, job) {
			jobList.append(jobToListItem(job));
		});
		jobList.appendTo(listItem);
	}

	return listItem;
}

var jobToListItem = function(job) {
	return $('<li></li>')
		.addClass('job')
		.addClass(job.status)
		.text(job.name);
};