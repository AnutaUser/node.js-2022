const express = require('express');
const mongoose = require('mongoose');

const {configs} = require('./configs');
const {userRouter} = require('./routes');

const app = express();
app.use(express.json());

mongoose.connect(configs.MONGO_API);

app.use('/users', userRouter);

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error!',
            code: err.status || 500
        });
});

app.listen(configs.PORT, () => {
    console.log(`Listen port ${configs.PORT} !`);
});
