var http            = require('http'),
    websocketStream = require('websocket-stream'),
    WebSocketServer = require('ws').Server,
    playPingPong    = require('./index'),

    SERVER_PORT = 8343,
    TIMEOUT     = 10e3

var TestServer = function() {

  var server, wss, serverStream, destroyTimeout

  function startInactivityTimeout() {
    clearTimeout(destroyTimeout)

    destroyTimeout = setTimeout(function() {
      console.log('Firing inactivity timeout. Destroying server ...')
      serverStream.destroy()
    }, TIMEOUT)
  }

  this.start = function() {

    server = http.createServer()
    wss    = new WebSocketServer({server: server})

    server.listen(SERVER_PORT, function() {
      console.log('Echo test server is running.')

      wss.on('connection', function(ws) {
        console.log('Server got websocket connection from client.')

        serverStream = websocketStream(ws)

        startInactivityTimeout()

        // commented out for now to reproduce the timeouts first
        // playPingPong(serverStream, {
        //   pingInterval: 30 * 1e3 // 30 sec
        // })

        serverStream.on('error', function(err) {
          console.error('Server stream error:', err)
        })

        serverStream.on('data', function(data) {
          startInactivityTimeout()
          console.log('Server got data:', data.toString())
        })

        serverStream.on('end', function() {
          console.log('Server ended.')
        })
      })
    })
  }
}

new TestServer().start()
