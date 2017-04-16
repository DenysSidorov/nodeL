import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParse from 'body-parser';
import morgan from 'morgan';

import config from './config';

const app = express();
app.listen(config.port, (err)=>{
    if (err) throw err;
    console.log('Server listening on port ' + config.port );
})


app.use(morgan('combined'));

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extend: true}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret
}))

app.get('*', async (req, resp)=>{
    resp.end('Hello world')
})