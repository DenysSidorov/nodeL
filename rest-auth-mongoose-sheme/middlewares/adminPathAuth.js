var basicAuth = require('basic-auth'); // который парсит заголовки запроса, часть authorization

var auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.status(401).send('401');
    };
    var user = basicAuth(req);
    // Если пользователь не ввёл пароль или логин, снова показать форму.
    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    };
    // Если логин admin, а пароль superChargePassword перейти к
    // следующему middleware.
    if (user.name === 'admin' && user.pass === 'superChargePassword') {
        return next();
    } else {
        return unauthorized(res);
    };
    return unauthorized(res);
};

 module.exports = auth;
