const mong = require('mongoose');
const validator = require('validator');


const userSchema = new mong.Schema({
    fName: {
        type: String,
        required: { true: "required" }
    },
    lName: {
        type: String,
        required: { true: "required" }
    },
    email: {
        type: String,
        required: { true: "required" },
        unique: true,
        validate: [validator.isEmail, 'isEmail!']
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        enm: ["User", "Admin", "Manger"],
        default: "User"
    },
    avatar: {
        type: String,
        defualt: 'uploads/bird.jpg'
    }
})


const model = mong.model('User', userSchema);

module.exports = model;