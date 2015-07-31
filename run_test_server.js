var beefy           = require('beefy'),
    http            = require('http'),
    websocketStream = require('websocket-stream'),
    WebSocketServer = require('ws').Server,
    playPingPong    = require('./index'),

    SERVER_PORT = 8343,
    CLIENT_PORT = 9966

var TestServer = function() {

  var server, wss

  this.start = function() {

    server = http.createServer()
    wss    = new WebSocketServer({server: server})

    server.listen(SERVER_PORT, function() {
      console.log('Echo test server is running.')

      wss.on('connection', function(ws) {
        console.log('Server got websocket connection from client.')

        var serverStream = websocketStream(ws)

        // commented out for now to reproduce the timeouts first
        // playPingPong(serverStream, {
        //   pingInterval: 30 * 1e3 // 30 sec
        // })

        serverStream.on('error', function(err) {
          console.error('Server stream error:', err)
        })

        serverStream.on('data', function(data) {
          console.log('Server got data:', data.toString())
        })

        serverStream.on('end', function() {
          console.log('Server ended.')
        })
      })

      var listener = beefy({
        entries: ['test_client.js'],
        cwd:     __dirname,
        live:    false,
        quiet:   false,
        open:    true
      })

      http.createServer(listener).listen(CLIENT_PORT, function() {
        console.log('Now open http://localhost:' + CLIENT_PORT + ' to run client-side tests.')
      })
    })
  }
}

new TestServer().start()
