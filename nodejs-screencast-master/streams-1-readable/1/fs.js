var fs = require('fs');

// fs.ReadStream наследует от stream.Readable
var stream = new fs.ReadStream(__filename);

stream.on('readable', function() {
  var data = stream.read();
 if (data) console.log(data.toString());
});

stream.on('end', function() {
  console.log("THE END");
});
