const express = require('express');
const users = require('./dataBase/users');

const app = express();

app.get('/', (req, res) => {
    res.json('Hello my friend)');
});

app.get('/users', (req, res) => {
    res.json(users);
});

// CREATE
app.get('/users/create', (req, res) => {
    users.push({
        name: 'Test',
        age: Math.round(Math.random() * 10)
    });
    res.status(201).json('User was created!');
});

// app.get('/users/:id/delete', (req, res) => {
//
//     const {id} = req.params;
//
//     const index = users.findIndex((user) => user.id === +id);
//
//     if (index === -1) {
//         res.status(404).json(`User with id ${id} not found!!!`);
//     }
//
//     users.splice(index, 1);
//     // users.push(users);
//     res.status(204).json('User delete!');
// });

app.get('/users/:id', (req, res) => {

    const userId = +req.params.id;

    if (isNaN(userId) || userId < 0) {
        res.status(400).json(`Please, enter valid name!`);
        return;
    }

    const user = users[userId];

    if (!user) {
        res.status(404).json(`User with id ${userId} not exist!!!`);
        return;
    }

    res.json(user);
});

app.listen(5200, () => {
    console.log('Server is work on port 5200');
});
