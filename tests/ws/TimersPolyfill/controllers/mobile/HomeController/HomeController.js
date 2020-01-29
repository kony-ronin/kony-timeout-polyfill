define(function(){

	return{
		init: function(){
			//Stuff you only want done once the first time the screen is visited.
		},
		preShow: function(){
			//Move stuff out of sight if you want to then animate back in.
		},
		postShow: function(){
			kony.print("Time typeof setTimeout " + typeof setTimeout);
			kony.print("Time typeof clearTimeout " + typeof clearTimeout);
			kony.print("Time typeof setInterval " + typeof setInterval);
			kony.print("Time typeof clearInterval " + typeof clearInterval);

			var timeouts = [];
			var intervals = [];

			this.view.setTimeoutButton.onClick = () => {
				var start = Date.now();
				var timerId = setTimeout(() => {
					var duration = Date.now() - start;
					kony.print("setTimeout fired after " + duration);
				}, parseInt(this.view.timeoutDelayTextBox.text));
				timeouts.push(timerId);
				kony.print("New timeout: " + JSON.stringify(timeouts));
			};

			this.view.setIntervalButton.onClick = () => {
				var start = Date.now();
				var timerId = setInterval(() => {
					var duration = Date.now() - start;
					kony.print("setInterval fired after " + duration);
				}, parseInt(this.view.intervalDelayTextBox.text));
				intervals.push(timerId);
				kony.print("New interval:" + JSON.stringify(intervals));
			};

			this.view.cancelTimeoutButton.onClick = () => {
				var timerId = timeouts.pop();
				clearTimeout(timerId);
				kony.print("clearTimeout cleared " + timerId);
			};

			this.view.cancelIntervalButton.onClick = () => {
				var timerId = intervals.pop();
				clearInterval(timerId);
				kony.print("clearInterval cleared " + timerId);
			};
		},
		onNavigate: function(){
			//Wire it all together.
			this.view.init = this.init;
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
		},
		onDestroy: function(){
			//Rarely used. Just keep in mind it exists.
		}
	};
});
