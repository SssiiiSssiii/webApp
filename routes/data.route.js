const express = require('express');
const router = express.Router();
const controller = require('../controllers/data.controller');
const { body } = require('express-validator');
const { validation } = require('../middlewares/validation')
const verfiyToken = require('../middlewares/verfiyToken');
const allowedTo = require('../middlewares/allowedTo')

router.use(express.json());

router.route('/')
    .get(controller.getAll)
    .post(verfiyToken.verfiyToken, validation, controller.create);

router.route('/:id')
    .get(controller.getByID)
    .patch(controller.update)
    .delete(verfiyToken.verfiyToken, allowedTo.allowedTo('Admin', 'Manger'), controller.detl);

module.exports = router;