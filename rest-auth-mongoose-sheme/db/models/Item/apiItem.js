var mongoose = require('mongoose');

var db = require('../../dbConnect').db;

// var db = mongoose.connect(url);

var Item = require('./Item.js')

exports.add = function(ItemData){
    return new Item(ItemData).save()
}

exports.removeOne = function(id){
    return Item.findOneAndRemove(id)
}


exports.findOne = function(id){
    return Item.findOne(id)
}

exports.find = function(queryData){
    return Item.find(queryData)
}