var configureEvents = require("./events.js")

module.exports = async (args) => {
  var connectListener

    if (typeof args[0] == "string") {
      self.url = new URL(args[0])
      if (typeof args[1] == "function") {
        connectListener = args[1]
      } 
    }
    else if (typeof args[0] == "object") {
      self.url = new URL('ws://' + args[0].host)
      self.url.port = args[0].port
    }
    else if (typeof args[0] == "number") {
      self.url = new URL('ws://localhost')
      self.url.port = args[0]
      if (typeof args[1] == "string") {
        self.url.hostname = args[1]
        if (typeof args[2] == "function") {
          connectListener = args[2]
        }
      }
    }
    
    if (connectListener) {
      self.on('connect', connectListener)
    }
    self.socket = new WebSocket(self.url.href)
    configureEvents(self)
    return self
}