import User from '../models/user';

export const singup = async(req, resp, next) => {
    let credentials = req.body; // Вытащим данные от юзера из формы.
    console.log(credentials, credentials);
    let user;

    // --- НЕ ЗАВЕЛОСЬ =(((
    // Используем try/catch - т.к используем async/await
    //  try {
    //     await User.create(credentials); // т.к тут асинхронный код - исп. await
    // } catch (err){
    //     next(err); // Если ощибка - прокидываем ее дальше, возможно express ее перехватит
    // Мы не используем callback - т.к как испоьзуем async/await
    // }  --- НЕ ЗАВЕЛОСЬ =(((

    User.create(credentials, (err, user) => {
        // Тут асинхронная операция
        if (err) {
            let {message} = err;
            next({status: 400, message})
        };
        // Если юзера нашли - отправим его на клиент
        if (user) {
            return resp.json(user);
        }
    })


}

export const singin = async(req, resp, next) => {

    // Получим наши данные
    const {login, password} = req.body;
    // Найдем нашего юзера в базе
    const user = User.findOne({login})
        .then(user => {
            if (user.password == password) {
                req.session.userId = user._id;
                resp.json(user);
            } else {
                next({
                    status: 400,
                    message: 'Bad credentials'
                })
            }
        }).catch(err => {
            // Если юзера не нашли - кидаем исключение
            return next({
                status: 400,
                message: 'User not found'
            })
        });
}
