const { validationResult } = require('express-validator');
const Data = require('../models/data.model');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');

async function getAll(req, res) {
    const data = await Data.find({}, { '__v': false });
    res.status(200).json({ status: httpStatusText.SUCCESS, data });
}

var getByID = asyncWrapper.handelExpection(
    async (req, re, next) => {
        let id = req.params['id'];
        let data = await Data.findById(id);

        if (!data) {
            const err = new Error();
            err.message = 'Not Found!';
            return next(err);
            return res.status(404).json({ status: httpStatusText.FAIL, data: { msg: "Not found!" } });
        }

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { data } });
    }
)

async function create(req, res) {
    let ans = req.body;
    let errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array()[0]['msg']);

    let nw = new Data(ans);
    await nw.save();

    res.status(201).json(nw);
}

async function update(req, res) {
    let ans = req.body;
    let id = req.params.id;
    let nw = await Data.updateOne({ _id: id }, { $set: { ...ans } });
    res.status(200).json(nw);
}

async function detl(req, res) {
    let id = req.params.id;
    await Data.deleteOne({ _id: id });

    res.json({ status: httpStatusText.SUCCESS, data: null });
}

module.exports = {
    getAll,
    getByID,
    create,
    update,
    detl
}