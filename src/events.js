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
      /* Convert our blob to a buffer */
      toBuffer(event.data, function(err, buf) { 
        if (err) throw err

        let data = buf
      })
      instance.emit("data", data)
    }
    socket.onopen = function (event) {
      instance.emit("connect") /* Nothing else */
    }
}