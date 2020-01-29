/**************************************************
 *        setTimeout & setInterval Polyfill       *
 * ************************************************
 *
 * Enhance the global scope with setTimeout, clearTimeout, setInterval and
 * clearInterval.
 *
 * Note : When used on its own, give this module prefix "aaa" to force this to
 * be loaded before any other javascript libraries that might be dependant on
 * setTimeout, clearTimeout, setInterval and clearInterval being already defined.
 *
 * @Author Miguelángel Fernández
 */
try{
	if(typeof clearTimeout === "undefined"){

		/**
		 * clearTimeout - Defines a global clearTimeout function if none already exists.
		 * This is useful for non-browser environments, so that native Android and iOS
		 * applications can leverage third party javascript libraries that may depend
		 * on this function.
		 */
		var clearTimeout = (timerId) => { // eslint-disable-line no-unused-vars
			try{kony.timer.cancel(timerId);}
			catch(e){kony.print(`timer ${timerId} did not exist or was already cancelled.`);}
		};
		kony.print("TimeroutPolyfill: Applied clearTimeout polyfill");
	}
	else{
		kony.print("TimeroutPolyfill: clearTimeout is already defined");
	}

	if(typeof clearInterval === "undefined"){
		/**
		 * clearInterval - Defines a global clearInterval function if none already exists.
		 * This is useful for non-browser environments, so that native Android and iOS
		 * applications can leverage third party javascript libraries that may depend
		 * on this function.
		 */
		var clearInterval = clearTimeout;
		kony.print("TimeroutPolyfill: Applied clearInterval polyfill");
	}
	else{
		kony.print("TimeroutPolyfill: clearInterval is already defined");
	}

	if(typeof setTimeout === "undefined"){

		/**
		 * setTimeout - Defines a global setTimeout function if none already exists.
		 * This is useful for non-browser environments, so that native Android and iOS
		 * applications can leverage third party javascript libraries that may depend
		 * on this function.
		 */
		var setTimeout = (fn, msDelay) => {  //eslint-disable-line no-unused-vars
			//TODO: Implement passing of additional parameters.
			var timerId = "timeout_" + Math.random();
			kony.timer.schedule(timerId, fn, msDelay/1000, false);
			return timerId;
		};
		kony.print("TimeroutPolyfill: Applied setTimeout polyfill");
	}
	else{
		kony.print("TimeroutPolyfill: setTimeout is already defined");
	}

	if(typeof setInterval === "undefined"){
		/**
		 * setInterval - Defines a global setInterval function if none already exists.
		 * This is useful for non-browser environments, so that native Android and iOS
		 * applications can leverage third party javascript libraries that may depend
		 * on this function.
		 */
		var setInterval = (fn, msDelay) => {  //eslint-disable-line no-unused-vars
			//TODO: Implement passing of additional parameters.
			var timerId = "interval_" + Math.random();
			kony.timer.schedule(timerId, fn, msDelay/1000, true);
			return timerId;
		};
		kony.print("TimeroutPolyfill: Applied setInterval polyfill");
	}
	else{
		kony.print("TimeroutPolyfill: setInterval is already defined");
	}
}
catch(e){
	alert("TimeroutPolyfill: " + e + "\n" + e.stack);
}
