var net = require('net')

function zeroFill(i) {
  return (i < 10 ? '0' : '') + i
}

function now () {
  var d = new Date()
  return d.getFullYear() + '-'
    + zeroFill(d.getMonth() + 1) + '-'
    + zeroFill(d.getDate()) + ' '
    + zeroFill(d.getHours()) + ':'
    + zeroFill(d.getMinutes())
}

var server = net.createServer(function (socket) {
  // socket.end():
  // Half-closes the socket. i.e., it sends a FIN packet.
  // It is possible the server will still send some data.
  // - If data is specified, it is equivalent to calling
  //   socket.write(data, encoding) followed by socket.end().
  socket.write('HTTP/1.1 200 OK\n\n')
  socket.end(now() + '\n')
})

// Listening on the port provided on the command line
server.listen(Number(process.argv[2]))
