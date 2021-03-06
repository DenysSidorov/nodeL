var express = require('express');
var router = express.Router();
var api = require('../db/models/Item/apiItem')

// Получение конкретного элемента
router.get('/:id', function(req, res, next) {
    api.findOne(req.params.id).then(function(document){
        res.json(document);
    })
});

// Удаление конкретного элемента
router.delete('/:id', function(req, res, next) {
    api.removeOne(req.params.id).then(function(document){
        res.json(document);
    })
});

// Создание нового элемента
router.post('/', function(req, res, next) {
    req.body.author = req.session.user.id;
    api.add(req.body).then(function(document){
        res.json(document);
    })
});

// Получение списка элементов
router.get('/', function(req, res, next) {
    api.find(req.body).then(function(document){
        res.json(document);
    })
});

module.exports = router;