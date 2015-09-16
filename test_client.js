var websocketStream = require('websocket-stream'),
    test            = require('tape'),

    SERVER_PORT = 8343,
    TIMEOUT     = 10e3

test('Writing after inactivity causes an error', function(t) {

  var clientStream = websocketStream('ws://localhost:' + SERVER_PORT),
      originalEmit = clientStream.emit,
      closed       = false,
      errString

  clientStream.emit = function(type) {
      console.log('Websocket stream emitted:', type)
      var args = Array.prototype.slice.call(arguments, 0)
      return originalEmit.apply(clientStream, args)
  }

  setTimeout(function() {
    console.log('Client wants to play ...')
    clientStream.write(new Buffer('Ping'))
  }, TIMEOUT + 1e3)

  clientStream.on('error', function(err) {
    errString = err.toString()
  })

  clientStream.on('close', function() {
    closed = true
  })

  setTimeout(function() {
    t.equal(closed, true)
    t.equal(errString, 'Error: write after end')
    clientStream.destroy()
    t.end()
  }, TIMEOUT + 2e3)
})

// CONTINUE FREOM HERE, ADD SECOND TEST CASE WITH PING PONG
