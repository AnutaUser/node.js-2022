const express = require('express');
const expressFileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), 'environments', `${process.env.MODE}.env`) });

const {configs} = require('./configs');
const {userRouter, authRouter} = require('./routes');

const app = express();
app.use(express.json());

mongoose.connect(configs.MONGO_URL);

app.use(expressFileUpload());

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use('*', (err, req, res, next) => {
    // console.log(err);
res
    .status(err.status || 500)
    .json({
        error: err.message || 'Unknown Error!',
        code: err.status || 500
    })
});

app.listen(configs.PORT, () => {
    console.log(`Work on port ${configs.PORT}`);
});
