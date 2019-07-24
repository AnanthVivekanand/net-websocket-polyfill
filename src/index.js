var events = require('events')
var url = require('url');

var socketUtils = require('./utils.js')
var connectSocket = require('./connect.js')

class socket extends events.EventEmitter {
  constructor(options) {
    super()
  }
  connect() {
    self = this //we can access this from inside connectSocket
    connectSocket(arguments)
  }

  write(data, encoding, callback) {
    /* We can take a string, Buffer, or Uint8Array
    and we need to make it into a string, Blob,
    or ArrayBuffer */
    
    if (typeof data == "string")
      this.socket.send(data)
    else {
      this.socket.send(new Blob([data])) 
    }

      /*
    this.socket.send(new Blob([data])) */

    if (typeof callback == "function") {
      callback()
    }
  }
  setEncoding(encoding) {
    if (encoding == "utf8")
        this.encoding = encoding
    else
        this.encoding = "binary"
  }
  get connecting() {
    return (this.socket.readyState == this.socket.CONNECTING)
  }
  destroy(exception = null) {
    this.socket.close(1000, "destroy called")
    this.emit('error', exception)
    return this
  }
  get remotePort() {
    return this.url.port
  }

  get bufferSize() {
    socketUtils.bufferSize(this)
  }
  get destroyed() {
    socketUtils.destroyed(this)
  }
  address() {

  }
  get remoteAddress() {

  }
}

module.exports.Socket = socket
