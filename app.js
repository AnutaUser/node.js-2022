const express = require('express');
const {fileService} = require('./services');

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
    const users = await fileService.reader();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const {name, age} = req.body;

    if (!Number.isInteger(age) || age < 18) {
        res.status(400).json('Enter valid age');
    }

    if (!name || name.length < 3) {
        res.status(400).json('Enter valid name');
    }

    const users = await fileService.reader();

    const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1};

    await fileService.writer([...users, newUser]);

    res.status(201).json(newUser);
});

app.get('/users/:userId', async (req, res) => {

    const {userId} = req.params;

    const users = await fileService.reader();

    const user = users.find((user) => user.id === +userId);

    // const user = users[userId];

    if (!user) {
        res.status(400).json(`User with id ${userId} not exist!!!`);
    }

    res.json(user);
});

app.put('/users/:userId', async (req, res) => {
    const {name, age} = req.body;
    const {userId} = req.params;

    if (age && !Number.isInteger(age) || age < 18) {
        res.status(400).json('Enter valid age');
    }

    if (name && name.length < 3) {
        res.status(400).json('Enter valid name');
    }
    const users = await fileService.reader();

    const index = users.findIndex((user) => user.id === +userId);

    if (index === -1) {
        res.status(400).json(`User with id ${userId} was not found`);
    }

    const updatedUser = {...users[index], ...req.body};
    // const updatedUser = Object.assign(users[index], req.body);

    users.splice(index, 1);

    await fileService.writer([...users, updatedUser]);

    res.status(201).json(updatedUser);
});

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await fileService.reader();

    const index = users.findIndex((user) => user.id === +userId);

    if (index === -1) {
        res.status(400).json(`User with id ${userId} was not found`);
    }

    users.splice(index, 1);

    await fileService.writer(users);

    res.sendStatus(204);
});

app.listen(5200, () => {
    console.log('Started on port 5200');
});