var { configureSocket } = require("./events.js")

class socket {
  constructor(options) {
    this.socket = new WebSocket(options.address)
    configureSocket(this.socket, this)
  }
}

module.exports.Socket = socket
