import config from '../config/index';
import jwt from 'jsonwebtoken';

// Создадим middleware проверяющие наличие токена
export default (req, resp, next)=>{
    // Будем хранить в заголовке токен авторизации
    // Вытащим токен из заголовка, если он там есть
    const token =req.headers['authorization'];
    // Если токена нет:
    if(!token){
        return resp.status(403)
             .json({message: 'Forbidden. No token!'})
    }

    // Если токен есть - проверяем его с секретным словом
    jwt.verify(token, config.secret , function(err, decoded) {
        if(err){
            const {message} = err;
            return resp.status(400).json({message});
        }
        // Если токен нормальный - пропускаем - все ок
        console.log(decoded);
        next();
    });
}