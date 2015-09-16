[![Build Status](https://travis-ci.org/binarykitchen/websocket-stream-ping-pong.svg?branch=master)](https://travis-ci.org/binarykitchen/websocket-stream-ping-pong)

Plays insane ping pong. Never loses. This to avoid a disconnect after an inactivity timeout.

For static servers there is no timeout but if your app is proxied behind nginx, then the default timeout is set to 60s, see `proxy_read_timeout` option at http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_read_timeout

Works on websocket streams instantiated by https://github.com/maxogden/websocket-stream.

## Installation

```bash
$ npm i -S websocket-stream-ping-pong
```

## Usage

```javascript
...

```


## API

...


## License

BSD © [Michael Heuberger](http://www.binarykitchen.com)
