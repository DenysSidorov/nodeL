import express from 'express';
import mongoose from 'mongoose'; // MongoDb ORM
import session from 'express-session';
import bodyParse from 'body-parser';
import morgan from 'morgan'; //  Логирование
import config from './config'; // Конфигурация
const app = express(); // Запуск приложения

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
}))

/** Подключение к базе данных mongodb*/
mongoose.connect(config.database, {}, err => {
    if (err) throw err;
    console.log(`Mongo connected!`);
});

app.get('*', async (req, resp)=>{
    resp.end('Hello world')
})