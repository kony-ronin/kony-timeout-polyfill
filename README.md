# Timeouts Polyfill for the Kony Platform

Defines the `setTimeout`, `clearTimeout`, `setInterval` and `clearInterval`
functions for non-browser environments -i.e. Native mobile. This allows for the
use of third party libraries dependent on these functions in Visualizer native
applications.

It also defines `kony.timer.schedule2` and `kony.timer.cancel2` as safe versions
of `kony.timer.schedule` and `kony.timer.cancel` respectively. These allow you
to schedule a timer without having to provide a unique timer id, and cancelling
a timer without having to worry about it actually existing or being already
cancelled.

# How to Install

You can get these included in your Visualizer project by running

    npm install --prefix=modules kony-timeout-polyfill

It's important to keep the `aaa` prefix in order to force these modules to be
loaded before any other javascript libraries that might be dependent on
`setTimeout`/`clearTimeout` or `setInterval`/`clearInterval` being defined.

## Implementation Notes

I use `eval` in order to avoid declaring the these functions unless they're
undefined. The fact that in global native apps there's no global `this` variable
and that in web apps they're already defined and I must avoid overwriting them,
makes the use of `eval` necessary.
