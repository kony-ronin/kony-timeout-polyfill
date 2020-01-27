/**************************************************
 *        setTimout & setInterval Polyfill        *
 * ************************************************
 *
 * Define safe versions of kony.timer.schedule and kony.timer.cancel which avoid
 * dealing with error handling logic, and enhance the global scope with
 * setTimeout, clearTimeout, setInterval and clearInterval.
 *
 * Note : When used on its own, give this module prefix "aaa" to force this to
 * be loaded before any other javascript libraries that might be dependant on
 * setTimeout, clearTimeout, setInterval and clearInterval being already defined.
 *
 * @Author Miguelángel Fernández
 */


/**
 * kony.timer.cancel2 - Safely cancels a timer. It behaves just like kony.timer.cancel, but without
 * assuming the timer is scheduled. It does not throw errors if
 * the timer does not exist or has been cancelled already. This is useful if the
 * timer you mean to cancel may be cancelled from several places in your logic,
 * and you wish to avoid possible errors due to race conditions.
 *
 * @param  {string} timerId The unique identifier of a timer which may or may not exist.
 */
kony.timer.cancel2 = function(timerId){ // eslint-disable-line no-unused-vars
	try{kony.timer.cancel(timerId);}
	catch(e){}
};

/**
 * kony.timer.schedule2 - Safely schedule a timer. It behaves just like kony.timer.schedule but
 * instead of expecting a unique timerId, it just expects a prefix —which is
 * not required to be unique— and then appends a randomised suffix to it, thus
 * guaranteeing that the timer will always be created.
 *
 * @param  {string} idPrefix The prefix that will be used to compose a unique identifier for the timer.
 * @return {string} The unique identifier of the newly created timer.
 */
kony.timer.schedule2 = (idPrefix, fn, delay, repeat) => {  //eslint-disable-line no-unused-vars
	var timerId = idPrefix + "_" + Math.random();
	kony.timer.schedule(timerId, () => {
		fn();
		if(!repeat) kony.timer.cancel2(timerId);
	}, delay, repeat);
	return timerId;
};

/**
 * setTimeout - Defines the setTimeout and clearTimeout functions for non-browser
 * environments -i.e. Native mobile. This helps the Kony platform play
 * nice with other javascript modules that might depend on these functions.
 *
 * Note: When used on its own, give this module prefix "aaa" to force this to be loaded before
 * any other javascript libraries that might be dependant setTimeout and clearTimeout
 * being already defined.
 */
const _setTimeout = (fn, msDelay) => {  //eslint-disable-line no-unused-vars
	//TODO: Implement passing of additional parameters.
	return kony.timer.schedule2("timer_", fn, msDelay/1000, false);
};

if(typeof window === "undefined" && typeof self === "undefined"){
	eval("var setTimeout = _setTimeout"); // eslint-disable-line no-eval
	eval("var clearTimeout = kony.timer.cancel2"); // eslint-disable-line no-eval
	kony.print("Defined setTimeout polyfill to: " + setTimeout); // eslint-disable-line no-undef
}
else{
	kony.print("setTimeout is natively supported as: " + setTimeout); // eslint-disable-line no-undef
}

/**
 * setInterval - Defines the setInterval and clearInterval functions for non-browser
 * environments -i.e. Native mobile. This helps the Kony platform play
 * nice with other javascript modules that might depend on these functions.
 *
 * Note: When used on its own, give this module prefix "aaa" to force this to be loaded before
 * any other javascript libraries that might be dependant setTimeout and clearTimeout
 * being already defined.
 */
const _setInterval = (fn, msDelay) => {  //eslint-disable-line no-unused-vars
	//TODO: Implement passing of additional parameters.
	return kony.timer.schedule2("interval_", fn, msDelay/1000, true);
};

if(typeof window === "undefined" && typeof self === "undefined"){
	eval("var setInterval = _setInterval"); // eslint-disable-line no-eval
	eval("var clearInterval = kony.timer.cancel2"); // eslint-disable-line no-eval
	kony.print("Defined setInterval polyfill to: " + setInterval); // eslint-disable-line no-undef
}
else{
	kony.print("setInterval is natively supported as: " + setInterval); // eslint-disable-line no-undef
}
