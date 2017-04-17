import express from 'express';
import mongoose from 'mongoose'; // MongoDb ORM
import session from 'express-session';
import bodyParse from 'body-parser';
import morgan from 'morgan'; //  Логирование

import config from './config'; // Конфигурация
import authRoute from './routes/auth';
import checkToken from './middlewares/checkToken'; // Проверка налисия токена

const app = express(); // Запуск приложения

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

app.use(morgan('tiny')); // Настройка логирования, см. документация на npmjs.com

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extend: true}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret
}));
app.use('/api', authRoute); // singin singup
app.get('/test', checkToken, (req, resp)=>{ // check token in headers
    resp.json('Success');
})
app.use(require('./middlewares/errors') ); // Обработчик ошибок должен быть последним



