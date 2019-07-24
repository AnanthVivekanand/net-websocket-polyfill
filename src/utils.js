var utils = {}

utils.address = function(instance) {
    return instance.socket.bufferedSize
}
utils.destroyed = function(instance) {
    return (instance.socket.readyState == instance.socket.CLOSED)
}
utils.bufferSize = function(instance) {
    return instance.socket.bufferedSize
}

module.exports = utils