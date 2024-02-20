const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller')
const verfiyToken = require('../middlewares/verfiyToken');
const multer = require('multer');

const diskS = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const fileName = `user-${Date.now()}.${file.mimetype.split('/')[1]}`
        cb(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    const imgT = file.mimetype.split('/')[0];
    if (imgT === 'image') {
        return cb(null, true)
    } else
        return cb(new Error('not allowed'));
}
const upload = multer({ storage: diskS, fileFilter  })
// get all useres
// regs
// login

router.use(express.json());

router.route('/')
    .get(verfiyToken.verfiyToken, userController.getAll);

router.route('/register')
    .post(upload.single('avatar'), userController.register);

router.route('/login')
    .post(userController.login);

module.exports = router;