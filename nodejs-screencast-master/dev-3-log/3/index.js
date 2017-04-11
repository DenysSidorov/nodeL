var http = require('http');

var server = http.createServer();
var u = 0;
server.on('request', (z, o)=>{
   console.log('user %d' , u);
   u++;
   o.end('kyky')
});

server.listen(1337);
