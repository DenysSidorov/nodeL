// http://127.0.0.1:3000/echo?message=Hello -> Hello

var http = require('http');
var url = require('url');

var server = new http.Server(function(req, res) {

  var urlParsed = url.parse(req.url, true);
  if(urlParsed.query['name']) console.log('loh');
console.log(urlParsed);
  // if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
  //   res.setHeader('Cache-control', 'no-cache,no-store,must-revalidate');
  //   res.end( urlParsed.query.message );
  // } else {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
    res.end(' ркусский','utf8');
  // }
});
server.on('error', function () {
    server.emmit('request',function (req, resp) {
        resp.send('400');
    })
})
server.listen(3000, '127.0.0.1');
