const cors = require('cors');
const express = require('express');
const expressFileUpload = require('express-fileupload');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config({path: path.join(process.cwd(), 'environments', `${process.env.MODE}.env`)});

const {configs} = require('./configs');
const cronRun = require('./cron');
const {userRouter, authRouter} = require('./routes');
const {CustomError} = require('./errors');
const swaggerJson = require('./swagger.json');

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {cors: '*'});

io.on('connection', (socket) => {
    // console.log('============================');
    // console.log(socket.handshake.query);
    // console.log(socket.handshake.auth);
    // console.log('============================');

    socket.on('sendMessage', (messageData) => {
        console.log('Socket:', socket.id, 'with auth token:', socket.handshake.auth.token, messageData);
    });

    // Emit to all users except sender
    socket.broadcast.emit('message:received', {
        user: 'Veronika',
        message: 'Hello  from Veronika!'
    });

    setTimeout(() => {
        io.emit('globalBroadcast', 'TEST SOCKET');
    }, 2000);

    socket.on('room:join', (joinInfo) => {
        socket.join(joinInfo.roomId);

        // To all members
        // io.to(joinInfo.roomId).emit('room:newMember', {id: socket.id});

        // To all members except sender
        socket.to(joinInfo.roomId).emit('room:newMember', {id: socket.id});

    })

});

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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use('*', (err, req, res, next) => {

    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error!',
            code: err.status || 500
        });
});

server.listen(configs.PORT, () => {
    console.log(`Work on port ${configs.PORT}`);
    cronRun();
});

function _configureCors() {

    const whitelist = configs.CORS_WHITE_LIST.split(';');

    return {
        origin: (origin, callback) => {
            if (whitelist.includes(origin)) {
                return callback(null, true);
            }
            callback(new CustomError('Not allowed by CORS!'));
        }
    };
}
