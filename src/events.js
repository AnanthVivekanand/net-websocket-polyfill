/* Handles websocket events ---> socket events for 
applications that need it */

const toBuffer = require('blob-to-buffer')

module.exports = function(instance) {
  instance.socket.onclose = (event) => {
    if (event.code == 1006) {
      instance.emit('close', { hadError: true })
    }
    else {
      instance.emit('close', { hadError: false})
    }
  }
  instance.socket.onerror = (event) => {
    instance.emit('error', event.message)
  }
  instance.socket.onmessage = (event) => {
    /* Data format depends on what proxy is used
    so we'll try to support as many as we can */

    if (instance.encoding == "binary") {
      if (event.data instanceof Blob) {
        toBuffer(event.data, (err, buf) => { 
          if (err) throw err
        
          instance.emit("data", buf)
        })
      } else if (typeof event.data == "string") {
        return Buffer.from(event.data)
      }
    } else if (instance.encoding == "utf8") {
      if (event.data instanceof Blob) {
        var reader = new FileReader()
        reader.onload = () => {
          instance.emit('data', reader.result)
        }
        reader.readAsText(event.data)
      } else if (typeof event.data == "string") {
        instance.emit('data', event.data) 
      }
    }
  }
  instance.socket.onopen = (event) => {
    instance.emit("connect") /* Nothing else */
    instance.emit("ready")
  }
}