const mong = require('mongoose');
const dataSchema = new mong.Schema({
    name: { type: String, required: [true, "required"] },
    age: { type: Number, required: true }
});

const model = mong.model('data', dataSchema);

module.exports = model;