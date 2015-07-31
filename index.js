module.exports = function(stream, opts) {

    // todo: instanceof check for stream

    opts = opts || {}

    // usually websocket-stream times out after 60 seconds,
    // so this value should be lower than that.
    opts.pingInterval = opts.pingInterval || 35e3

    function ping() {
        !stream.destroyed && stream.socket.ping()
    }

    var intervalId = setInterval(ping, opts.pingInterval)

    function gameOver() {
        clearInterval(intervalId)
        intervalId = null
    }

    stream.socket.addEventListener('close', gameOver())
    stream.socket.addEventListener('error', gameOver())
}
