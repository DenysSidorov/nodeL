// var mongoose = require('mongoose');
// var db = mongoose.connect(url)
// var url = "mongodb://localhost:27017/usersdb";

var db = require('../../dbConnect').db;
var crypto = require('crypto');
var User = require('./User.js')

// User API

exports.createUser = function(userData){
    var user = {
        name: userData.name,
        email: userData.email,
        password: hash(userData.password)
    }
    return new User(user).save()
}

exports.getUser = function(id) {
    return User.findOne(id)
}

exports.checkUser = function(userData) {
    return User
        .findOne({email: userData.email})
        .then(function(doc){
            if ( doc.password == hash(userData.password) ){
                console.log("User password is ok");
                return Promise.resolve(doc)
            } else {
                return Promise.reject("Error wrong")
            }
        })
}

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}