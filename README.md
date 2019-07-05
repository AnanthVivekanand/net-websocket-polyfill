# net-websocket-polyfill

This a browserify polyfill to emulate the net module. The net module can't
be browserified, because browsers don't have access to sockets.
This project is meant to emulate the net module
by organizing all traffic through WebSockets, instead of Sockets. This module tries
to keep the api as similar as possible, but refer to the source code if needed.

TODO: 
- Support connect method
- Support write method
- Support ip address and DNS utilities
