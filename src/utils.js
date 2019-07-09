utils = {}

utils.address = function(instance) {
    return instance.socket.bufferedSize
}
utils.destroyed = function(instance) {
    return (instance.socket.readyState == 3)
}
utils.bufferSize = function(instance) {
    return instance.socket.bufferedSize
}

module.exports = utils