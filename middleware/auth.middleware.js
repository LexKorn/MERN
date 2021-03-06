const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]  // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({message: 'Нет авторизации'});  // return для того, чтобы код дальше не выполнялся
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'));     // раскодировать токен с помощью секретного ключа
        req.user = decoded;
        next();

    } catch(err) {
        res.status(401).json({message: 'Нет авторизации'});
    }
}