# Timeouts Polyfill for the Quantum Platform

Defines the `setTimeout`, `clearTimeout`, `setInterval` and `clearInterval`
functions for non-browser environments. This allows for the
use of third party libraries dependent on these functions in Visualizer native
applications.

# How to Install

You can get these included in your Visualizer project by running

    npm install --prefix=modules kony-timeout-polyfill

It's important to keep the `aaa` prefix in order to force these modules to be
loaded before any other javascript libraries that might be dependent on
`setTimeout`/`clearTimeout` or `setInterval`/`clearInterval` being defined.
