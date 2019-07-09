exports = module.exports

exports.address = function(instance) {
    return instance.socket.bufferedSize
}
exports.destroyed = function(instance) {
    return (instance.socket.readyState == 3)
}
exports.bufferSize = function(instance) {
    return instance.socket.bufferedSize
}
