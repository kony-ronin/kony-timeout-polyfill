Timeout MonkeyPatch for Kony Platform

Version: 1.0.0

Description: 
Defines the setTimeout and clearTimeout functions for non-browser 
environments -i.e. Native mobile. This helps the Kony platform play
nice with other javascript modules that might depend on these function definitions
-e.g. Promises polyfills and Kris Kowal's Q.

Implementation Notes:
1) Uses the eval function to avoid declaring a setTimeout or clearTiemout
variable/function unless it's necessary. Declaring it and not initializing it
will lead to breaking the natively defined namespace on browser environments.

2) Can't wrap in closure notation as there seems to be no global variable -equialent
to window or self- in non-browser environments, so there would be nothing to attach
it to. Therefore it just has to be declared as a global variable.

3) Prefix "000" to module name is important to try and force this to be loaded before
any other javascript libraries that might be dependant setTimeout and clearTimeout
being already defined.
