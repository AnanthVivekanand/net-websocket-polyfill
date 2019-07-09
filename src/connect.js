var configureEvents = require("./events.js")

connectSocket = function(args_object) {
    var connectListener;

    var instance = args_object.instance
    var arguments = args_object.arguments

    if (typeof arguments[0] == "string") {
      instance.URL = new URL(arguments[0])
      if (typeof arguments[1] == "function") {
        connectListener = arguments[1]
      } 
    }
    else if (typeof arguments[0] == "object") {
      instance.url = new URL('ws://' + arguments[0].host)
      instance.url.port = arguments[0].port
    }
    else if (typeof arguments[0] == "number") {
      instance.url = new URL('ws://localhost')
      instance.url.port = arguments[0]
      if (typeof arguments[1] == "string") {
        instance.url.hostname = arguments[1]
        if (typeof arguments[2] == "function") {
          connectListener = arguments[2]
        }
      }
    }
    
    instance.socket = new WebSocket(instance.url.href)
    configureEvents(instance.socket, instance)
    if (connectListener) {
      instance.addListener('connect', connectListener)
    }
    return instance
}

module.exports = connectSocket