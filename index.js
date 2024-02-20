const express = require('express');
const app = express();
const router = require('./routes/data.route');
const userRouter = require('./routes/user.route');
const mong = require('mongoose');
const httpStatusText = require('./utils/httpStatusText');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const url = process.env.MONGO_URL;

mong.connect(url).then(() => {
    console.log("Connected!");
});

app.use(cors());
app.use('/api/data', router);
app.use('/api/users', userRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.all('*', (req, res) => {
    res.json({ status: httpStatusText.ERROR, message: 'Not Found' });
})

// global error handler
app.use((err, req, res, next) => {
    res.json({ status: httpStatusText.ERROR, msg: err.message });
})

app.listen(process.env.PORT ?? 3000, () => {
    console.log('Listening On Port: 3000');
})



