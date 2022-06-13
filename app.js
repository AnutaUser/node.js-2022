const express = require('express');
const {fileService} = require('./services');

const app = express();

app.use(express.json());

app.get('/cars', async (req, res) => {
    const cars = await fileService.reader();
    res.json(cars);
});

app.post('/cars', async (req, res) => {

    const {model, price, year} = req.body;

    if (!model || model.length < 2) {
        return res.status(400).json('Enter valid model!');
    }
    if (!price || !Number.isInteger(price) || price < 0 || price > 1000000) {
        return res.status(400).json('Enter valid price!');
    }
    if (!year || !Number.isInteger(year) || year > 2022 || year < 1990) {
        return res.status(400).json('Enter valid year!');
    }

    const cars = await fileService.reader();

    const newCar = {...req.body, id: cars.length ? cars[cars.length - 1].id + 1 : 1};

    await fileService.writer([...cars, newCar]);

    res.status(201).json(newCar);
});

app.get('/cars/:carId', async (req, res) => {
    const {carId} = req.params;

    const cars = await fileService.reader();

    const car = cars.find((car) => car.id === +carId);

    if (!car) {
        return res.status(204).json(`Car with id ${carId} not exist!`);
    }

    res.json(car);
});

app.put('/cars/:carId', async (req, res) => {
    const {carId} = req.params;

    const {model, price, year} = req.body;

    if (!model || model.length < 2) {
        return res.status(400).json('Enter valid model!');
    }
    if (!price || !Number.isInteger(price) || price > 1000000 || price < 0) {
        return res.status(400).json('Enter valid price!');
    }
    if (!year || !Number.isInteger(year) || year > 2022 || year < 1990) {
        return res.status(400).json('Enter valid year!');
    }

    const cars = await fileService.reader();

    const index = cars.findIndex((car) => car.id === +carId);

    if (index === -1) {
        return res.status(400).json(`Car with id ${carId} not exist!`);
    }

    // const updateCar = Object.assign(cars[index], req.body);
    const updateCar = {...cars[index], ...req.body};

    cars.splice(index, 1);

    await fileService.writer([...cars, updateCar]);

    res.json(updateCar);
});

app.delete('/cars/:carId', async (req, res) => {
    const {carId} = req.params;

    const cars = await fileService.reader();

    const index = cars.findIndex((car) => car.id === +carId);

    if (index === -1) {
        return res.status(400).json(`Car with id ${carId} not exist!`);
    }
    cars.splice(index, 1);

    await fileService.writer(cars);

    res.sendStatus(204);
});

app.listen(5200, () => {
    console.log('Port 5200 is work');
});