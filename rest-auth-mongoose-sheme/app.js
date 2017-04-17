var logger = require('morgan'); // логирование
var cookieParser = require('cookie-parser'); // парсить куки
var bodyParser = require('body-parser'); // парсить тело форм и json
var path = require ('path');
var express = require('express'); // framework express - класс!
var mongoose = require("mongoose") // ORM для работы с данными из базы
var session = require('express-session'); // middleware для работы с сессиями
var MongoStore = require('connect-mongo')(session); // хранение сессии в mongoDB, не в Memory
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json()); // парсить json файлы
app.use(bodyParser.urlencoded({ extended: false })); // парсить тело форм
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // установка директории

// view engine setup
app.set('views', path.join(__dirname, 'views')); // директория с шаблонами
app.set('view engine', 'jade');


// middleware которое отвечает за проверку и парсинг данных админа
var auth  = require('./middlewares/adminPathAuth');
app.use('/admin', auth);

//...
var url = "mongodb://localhost:27017/usersdb";
app.use(session({
    secret: 'i need more beers',
    resave: false,
    saveUninitialized: false, // позволяет быстро работать с хранилещем, сохранять уже зареганых
    // Место хранения можно выбрать из множества вариантов, это и БД и файлы и Memcached.
    store: new MongoStore({
        url: url,
    })
}))

var items = require('./routes/items');
var users = require('./routes/users');
var logRoute = require('./routes/');
/* Тут как бы соеденили роуты
* При помощи var router = express.Router(); - в файле routes
* Получилось '/' + 'user'
* */
app.use('/items', items);
app.use('/users', users);
app.get('/', logRoute);
var errMiddleware = require('./middlewares/errors');
app.use(errMiddleware);

app.listen(3000, ()=>{console.log('App - has started');}) // Запуск сервера
