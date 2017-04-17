import express from 'express';
import mongoose from 'mongoose'; // MongoDb ORM
import session from 'express-session';
import bodyParse from 'body-parser';
import morgan from 'morgan'; //  Логирование
import config from './config'; // Конфигурация
const app = express(); // Запуск приложения

import authRoute from './routes/auth';


/** Подключение к базе данных mongodb*/
mongoose.Promise = require('bluebird'); // Для асинхронного кода
mongoose.connect(config.database, {}, err => {
    if (err) throw err;
    console.log(`Mongo connected!`);
});

/** Запуск приожения на порте*/
app.listen(config.port, (err)=>{
    if (err) throw err;
    console.log('Server listening on port ' + config.port );
});

app.use(morgan('combined')); // Настройка логирования, см. документация на npmjs.com

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extend: true}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret
}));
app.use('/api', authRoute);
app.use(require('./middlewares/errors') ); // Обработчик ошибок должен быть последним



