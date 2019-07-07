/* Handles websocket events ---> socket events for 
applications that need it */

var toBuffer = require('blob-to-buffer')

function configureSocket(socket, instance) {
  socket.onclose = function (event) {
    if (event.code == 1006) {
      instance.emit('close', { hadError: true })
    }
    else {
      instance.emit('close', { hadError: false})
    }
  }
  socket.onerror = function (event) {
    instance.emit('error', event.message)
  }
  socket.onmessage = function (event) {
    /* Data format depends on what proxy is used
    so we'll try to support as many as we can */
    if (instance.encoding == "binary" && 
        event.data instanceof Blob) {
      toBuffer(event.data, function(err, buf) { 
        if (err) throw err
      
        instance.emit("data", buf)
      })
    }
    else if (instance.encoding == "utf8" &&
             event.data instanceof Blob) {
      var reader = new FileReader()
      reader.onload = function() {
        instance.emit('data', reader.result)
      }
      reader.readAsText(event.data)
    }
    else if (instance.encoding == "utf8" &&
             typeof event.data == "string") {
      instance.emit('data', event.data) 
    }
    else if (instance.encoding == "binary" &&
             typeof event.data == "string") {
      var enc = new TextEncoder("utf-8")
      arr = enc.encode(event.data)
      instance.emit('data', arr)
    }
  }
  socket.onopen = function (event) {
    instance.emit("connect") /* Nothing else */
  }
}

module.exports = configureSocket