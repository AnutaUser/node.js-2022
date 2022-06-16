const express = require('express');

const {carRouter} = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/cars', carRouter);


app.listen(5200, () => {
    console.log('5200 work!');
});