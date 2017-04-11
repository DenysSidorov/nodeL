var fs = require('fs');

// fs.ReadStream наследует от stream.Readable
var stream = new fs.ReadStream(__filename);

stream.on('readable', function() {
  var data = stream.read();
  if (data)console.log(data.length);
});

stream.on('end', function() {
  console.log("THE END");
});

stream.on('close' ,()=> console.log('CLOSE'));

stream.on('error', function(err) {
  if (err.code == 'ENOENT') {
    console.log("Файл не найден, попинайте админа, пусть выложит..");
  } else {
    console.error(err);
  }
});