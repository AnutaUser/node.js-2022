const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dec');

const {carRouter, userRouter} = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/cars', carRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Router not found');
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown error',
            code: err.status || 500
        });

});

app.listen(5200, () => {
    console.log('5200 work!');
});