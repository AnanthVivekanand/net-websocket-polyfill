# net-websocket-polyfill

**PRs are greatly appreciated**

This a browserify polyfill to emulate the [net](https://nodejs.org/api/net.html) module. 

Browserify generates polyfills when it can, but the net module can't
be browserified, because browsers don't have access to sockets.
This project is meant to emulate the net module
by organizing all traffic through WebSockets, instead of Sockets. This module tries
to keep the api as similar as possible, but refer to the source code if needed.
This means you should be able to **plug and play** this module instead of the standard
net module.

## Usage

Load `aliasify` as a transform. Set this module as an alias for the `net` module. For example, you could do this in your `package.json`

```
  "browserify": {
    "transform": [
      "aliasify"
    ]
  },
  ```
  Then configure the alias.
  
  ```
  "aliasify": {
    "aliases": {
      "net": "./browser/polyfills/net/index.js"
    }
  },
```

TODO:
- `socket.destroy()`
- `socket.close()`
- Support IP address and DNS utilities
