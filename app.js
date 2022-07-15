const express = require('express');
const expressFileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config({path: path.join(process.cwd(), 'environments', `${process.env.MODE}.env`)});

const {configs} = require('./configs');
const cronRun = require('./cron');
const {userRouter, authRouter} = require('./routes');
const {CustomError} = require('./errors');

const app = express();
app.use(express.json());

mongoose.connect(configs.MONGO_URL);

if (configs.NODE_ENV !== 'prod') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// app.use(cors(_configureCors()));
app.use(expressFileUpload());

app.use('/ping', (req, res) => res.json('PING'));
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use('*', (err, req, res, next) => {

    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error!',
            code: err.status || 500
        });
});

app.listen(configs.PORT, () => {
    console.log(`Work on port ${configs.PORT}`);
    cronRun();
});

// function _configureCors() {
//
//     const whitelist = configs.CORS_WHITE_LIST.split(';');
//
//     return {
//         origin: (origin, callback) => {
//             if (whitelist.includes(origin)) {
//                 return callback(null, true);
//             }
//                 callback(new CustomError('Not allowed by CORS!'));
//         }
//     };
// }
