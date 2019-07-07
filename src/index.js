var configureEvents = require("./events.js")
var events = require('events')
var url = require('url');

class socket extends events.EventEmitter {
  constructor(options) {
    super()
  }
  async connect(port, host, connectListener) {
    this.url = new URL(host)
    this.url.port = port

    this.socket = new WebSocket(this.url.href)
    configureEvents(this)
    return this
  }
  /*
  async connect(options, connectListener) {
    this.url = new URL(options.host)
    this.url.port = options.port

    this.socket = new WebSocket(this.url.href)
    configureEvents(this)
    return this
  } */
  write(data, encoding, callback) {
    /* We can take a string, Buffer, or Uint8Array
    and we need to make it into a USVString, Blob,
    or ArrayBuffer */
    this.socket.send(new Blob([data]))
  }
  remotePort() {
    return this.url.port
  }
}

module.exports.Socket = socket
