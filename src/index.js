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
    configureEvents(this.socket, this)
    if (connectListener) {
      this.addListener('connect', connectListener)
    }
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
    if (typeof data == "string")
      this.socket.send(data)
    else
      this.socket.send(new Blob([data]))
  }
  setEncoding(encoding) {
    if (encoding == "utf8")
        this.encoding = encoding
    else
        this.encoding = "binary"
  }
  remotePort() {
    return this.url.port
  }
}

module.exports.Socket = socket
