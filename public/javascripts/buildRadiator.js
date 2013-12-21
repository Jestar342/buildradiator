(function($) {
	$(function() {
		var showAllBuilds = $('#showAllBuilds');
		var countdown = $('#countdown');
		var timer = new Timer(10);
		var builds = $('#builds');

		timer.onTick(function(tick) {
			countdown.text(tick);
		});

		timer.onCountdownFinished(function() {
			timer.end();
			builds.empty().removeClass('all-clear').addClass('loading');


			var resume = function() {	
				builds.removeClass('loading');
				timer.begin();
			};

			var renderBuildsList = function(data) {
				var buildsList = $('<ul></ul>');

				if (data.length) {
					$(data).each(function(index, build) {
						buildsList.append(buildToListItem(build));
					});
					buildsList.appendTo(builds);
					resume();
				} else {
					resume();
					builds.addClass('all-clear');
				}
			};

			var displayErrorMessage = function(jqXhr, textStatus, errorThrown) {
				builds.append('<h1 class="error">Error occured: ' + jqXhr.status + '</h1>');
				resume();
			};

			var url = showAllBuilds.is(':checked')
			? '/data'
			: '/data/fail';

			$.ajax({
				dataType: "json",
				url: url,
				success: renderBuildsList,
				error: displayErrorMessage,
				headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
			});
		});

		timer.begin();
	});
})(jQuery);