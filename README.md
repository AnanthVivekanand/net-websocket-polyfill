k# net-websocket-polyfill

**PRs and issues are greatly appreciated**

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

**You need a WebSocket/TCP proxy in order for this to work!**. The browser doesn't have access to raw TCP sockets so we should transmit data over a websocket to our proxy. Our proxy will forward data to the specified target. [This](https://github.com/zquestz/ws-tcp-proxy) proxy will work. Then connect to the proxy instead of the target.

#### TODO:
- Support IP address and DNS utilities
- General support
- Test module with other popular projects

## Features

Green checkmarks indicate polyfills that this module has. Features are being added
as fast as possible!

Class: net.Socket
 - new net.Socket([options]) :heavy_check_mark:
 - Event: 'close' :heavy_check_mark:
 - Event: 'connect' :heavy_check_mark:
 - Event: 'data' :heavy_check_mark:
 - Event: 'drain'
 - Event: 'end'
 - Event: 'error' :heavy_check_mark:
 - Event: 'lookup'
 - Event: 'ready' :heavy_check_mark:
 - Event: 'timeout'
 - socket.address() :heavy_check_mark:
 - socket.bufferSize :heavy_check_mark:
 - socket.bytesRead
 - socket.bytesWritten
 - socket.connect() :heavy_check_mark:
    - socket.connect(options[, connectListener]) :heavy_check_mark:
    - socket.connect(path[, connectListener]) :heavy_check_mark:
    - socket.connect(port[, host][, connectListener]) :heavy_check_mark:
 - socket.connecting :heavy_check_mark:
 - socket.destroy([exception]) :heavy_check_mark:
 - socket.destroyed :heavy_check_mark:
 - socket.end([data][, encoding][, callback])
 - socket.localAddress
 - socket.localPort
 - socket.pause()
 - socket.pending
 - socket.ref()
 - socket.remoteAddress
 - socket.remoteFamily
 - socket.remotePort :heavy_check_mark:
 - socket.resume()
 - socket.setEncoding([encoding]) :heavy_check_mark:
 - socket.setKeepAlive([enable][, initialDelay])
 - socket.setNoDelay([noDelay])
 - socket.setTimeout(timeout[, callback])
 - socket.unref()
 - socket.write(data[, encoding][, callback]) :heavy_check_mark:

