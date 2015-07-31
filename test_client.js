var websocketStream = require('websocket-stream'),
    test            = require('tape'),

    SERVER_PORT = 8343

test('Writing after pausing for 70 sec causes an error', function(t) {
  var clientStream = websocketStream('ws://localhost:' + SERVER_PORT),
      errString

  setTimeout(function() {
    console.log('Client wants to play ...')
    clientStream.write(new Buffer('Ping'))
  }, 70 * 1e3) // usually, websockets time out after 60 seconds

  clientStream.on('error', function(err) {
    errString = err.toString()
  })

  setTimeout(function() {
    t.equal(errString, 'Error: write after end', 'Client stream timed out')
    clientStream.destroy()
    t.end()
  }, 75 * 1e3)
})
