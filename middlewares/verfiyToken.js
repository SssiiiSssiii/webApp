
const jwt = require('jsonwebtoken');

function verfiyToken(req, res, next) {
    const autHeader = req.headers['authorization'];

    if (!autHeader) {
        return res.status(401).json('Token Required!');
    }
    const token = autHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currUser = decodedToken;
        next();
    } catch (err) {
        return res.status(401).json('Inavlid token');
    }
}

module.exports = {
    verfiyToken
}