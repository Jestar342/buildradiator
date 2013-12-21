var Timer = function(start, step, tickrate) {
	var self = this;
	self.step = step || 1;
	self.tickrate = tickrate || 1000;
	self.start = start;
	self.current = start;
	self.__tickEvents = [];
	self.__countdownEvents = [];
	self.__interval = 0;

	self.onTick = function(callback) {
		self.__tickEvents.push(callback);
	};

	self.onCountdownFinished = function (callback)	{
		self.__countdownEvents.push(callback);
	};

	self.begin = function() {
		self.__interval = setInterval(self.__tick, self.tickrate);
	};

	self.end = function() {
		clearInterval(self.__interval);
	};

	self.restart = function() {
		self.current = self.start;
	};

	self.__countdownDone = function() {
		for (var i = self.__countdownEvents.length - 1; i >= 0; i--)
			self.__countdownEvents[i]();
		self.restart();
	};

	self.__tick = function() {
		self.current = self.current - self.step;

		for (var i = 0; i < self.__tickEvents.length; i++)
			self.__tickEvents[i](self.current);

		if (self.current < self.step)
			self.__countdownDone();
	};
};