const User = require('../models/user.model');
const httpStatusText = require('../utils/httpStatusText');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const genJWT = require('../utils/JWT');

async function getAll(req, res) {
    const users = await User.find({}, { '__v': false, 'password': false });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
}


async function register(req, res) {

    const { fName, lName, email, password, role } = req.body;
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
        return res.status(400).json("Exist!");
    }

    const hashedPassword = await bycrypt.hash(password, 5);

    const nw = new User({
        fName,
        lName,
        email,
        password: hashedPassword,
        role,
        avatar: req.file.filename
    });

    const token = await genJWT.genJWT({ email: nw.email, id: nw._id, role: nw.role })
    nw.token = token;

    await nw.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: nw } });
}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    const matchedPass = await bycrypt.compare(password, user.password);

    if (matchedPass) {
        const token = await genJWT.genJWT({ email: user.email, id: user._id, role: user.role })
        return res.json({ status: httpStatusText.SUCCESS, data: { token } })
    }
    else return res.json('Error!')
}

module.exports = {
    getAll,
    register,
    login
}