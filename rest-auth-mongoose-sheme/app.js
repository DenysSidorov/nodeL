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

// middleware которое отвечает за проверку и парсинг данных админа
var auth  = require('./middlewares/adminPathAuth');
app.use('/admin', auth);

/* Тут как бы соеденили роуты
* При помощи var router = express.Router(); - в файле routes
* Получилось '/' + 'user'
* */
app.use('/', routes);
//app.use('/users', users);
// app.get('/', (req, res)=> res.end('cooll'));

app.listen(3000, ()=>{console.log('App - has started');})