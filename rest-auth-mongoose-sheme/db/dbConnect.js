var url = "mongodb://localhost:27017/usersdb";
var mongoose = require('mongoose');

module.exports.db = mongoose.connect(url);

// .db = db;
// var db = require('mongoose'); //note only one 'require' needed.
// var connectionToDb1 = db.createConnection('my.db1.ip.address', 'my-db1');
// var connectionToDb2 = db.createConnection('my.db2.ip.address', 'my-db2');