(function($) {
	var timer = new Timer(5);

	timer.onTick(function(tick) {
		$('#countdown').text(tick);
	});

	timer.onCountdownFinished(function() {
		timer.end();
		var builds = $('#builds');
		builds.empty().addClass('loading');

		var resume = function() {
			builds.removeClass('loading');
			timer.begin();
		};

		var onSuccess = function(data) {
			var buildsList = $('<ul></ul>');
			$(data).each(function(index, build) {
				buildsList.append(buildToListItem(build));
			});
			buildsList.appendTo(builds);
			resume();
		};

		var onError = function(jqXhr, textStatus, errorThrown) {
			builds.append('<h1 class="error">Error occured: ' + jqXhr.status + '</h1>');
			resume();
		};

		$.ajax({
			dataType: "json",
			url: '/data',
			success: onSuccess,
			error: onError,
			headers: {
				'Cache-Control': 'no-store, no-cache, must-revalidate' 
			}
		});
	});

	timer.begin();
})(jQuery);