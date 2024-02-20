
const jwt = require('jsonwebtoken');

async function genJWT(payLoad) {
    const token = await jwt.sign(payLoad, process.env.JWT_SECRET_KEY, { expiresIn: '3m' })
    return token;
}
module.exports = {
    genJWT
}