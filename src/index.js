var configureEvents = require("./events.js")
var events = require('events')

class socket extends events.EventEmitter {
  constructor(options) {
    super()
  } 
  async connect(port, host, connectListener) {
    var address = "ws://" + host + ":" + port
    this.socket = new WebSocket(address)
    configureEvents(this)
    return this
  }
}

module.exports.Socket = socket
