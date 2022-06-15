const express = require('express');
const {urlencoded} = require('express');

const {carRouter, userRouter} = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', async (req, res)=>{
    await res.status(404).json('Not Found');
})

app.listen(5200, () => {
    console.log('Port 5200 is work');
});