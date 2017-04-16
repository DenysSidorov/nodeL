var logger = require('morgan'); // логирование
var cookieParser = require('cookie-parser'); // парсить куки
var bodyParser = require('body-parser'); // парсить тело форм и json
var path = require ('path');
var express = require('express');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json()); // парсить json файлы
app.use(bodyParser.urlencoded({ extended: false })); // парсить тело форм
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // установка директории

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var routes = require('./routes/items');
//var users = require('./routes/users');


var auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    };

    return unauthorized(res)
};

app.use('/admin', auth);

app.use('/', routes); //
//app.use('/users', users);
// app.get('/', (req, res)=> res.end('cooll'));

app.listen(3000, ()=>{console.log('App - has started');})