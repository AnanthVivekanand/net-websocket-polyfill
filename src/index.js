var configureEvents = require("./events.js")

class socket {
  constructor(options) {
    this.socket = new WebSocket(options.address)
    configureEvents(this.socket, this)
  }
}

module.exports.Socket = socket
